import { google } from 'googleapis'
import type { youtube_v3 as YoutubeV3 } from 'googleapis'

// Type guard to check if an object is an ApiError
function isApiError(obj: unknown): obj is {
  status?: number
  message?: string
  errors?: Array<{
    reason?: string
  }>
} {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    ('status' in obj || 'errors' in obj || 'message' in obj)
  )
}

class YouTubeClient {
  private youtube: YoutubeV3.Youtube

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    this.youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client
    })
  }

  async createPlaylist(title: string, videoIds: string[]): Promise<string> {
    const res = await this.youtube.playlists.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title,
          description: 'Curated by VibeBot — no skips 🔥'
        },
        status: {
          privacyStatus: 'public'
        }
      }
    })

    const playlistId = res.data.id || ''
    console.log(
      `✅ Created playlist: ${title} (https://www.youtube.com/playlist?list=${playlistId})`
    )

    // Process videos sequentially with retry logic
    for (let i = 0; i < videoIds.length; i++) {
      const videoId = videoIds[i]
      await this.addVideoToPlaylist(playlistId, videoId)
      console.log(`Progress: ${i + 1}/${videoIds.length} videos added`)

      // Add a small delay between requests to avoid rate limiting
      if (i < videoIds.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    return playlistId
  }

  private async addVideoToPlaylist(
    playlistId: string,
    videoId: string,
    retryCount = 0
  ): Promise<void> {
    const maxRetries = 5
    const baseDelay = 1000 // 1 second

    try {
      await this.youtube.playlistItems.insert({
        part: ['snippet'],
        requestBody: {
          snippet: {
            playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId
            }
          }
        }
      })
      console.log(`→ Added video: ${videoId}`)
    } catch (error: unknown) {
      // Check if the error conforms to our expected error structure
      if (!isApiError(error)) {
        console.error(`❌ Unknown error adding video ${videoId}`)
        return
      }

      // Check if error is due to service unavailability or other retryable error
      const isRetryable =
        error.status === 409 ||
        error.status === 429 ||
        (error.status && error.status >= 500 && error.status < 600) ||
        (error.errors && error.errors.some((e) => e.reason === 'SERVICE_UNAVAILABLE'))

      if (isRetryable && retryCount < maxRetries) {
        // Calculate delay with exponential backoff (and some jitter)
        const delay = baseDelay * Math.pow(2, retryCount) * (0.8 + Math.random() * 0.4)
        console.log(
          `⚠️ Retrying video ${videoId} after ${Math.round(delay)}ms ` +
            `(attempt ${retryCount + 1}/${maxRetries})`
        )

        // Wait for the calculated delay
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Retry the operation
        return this.addVideoToPlaylist(playlistId, videoId, retryCount + 1)
      } else if (retryCount >= maxRetries) {
        console.error(`❌ Failed to add video ${videoId} after ${maxRetries} attempts`)
        // Continue with other videos instead of failing the entire process
      } else {
        // For non-retryable errors, log and continue
        console.error(`❌ Error adding video ${videoId}: ${error.message || 'Unknown error'}`)
      }
    }
  }
}

export const youTubeClient = new YouTubeClient()
