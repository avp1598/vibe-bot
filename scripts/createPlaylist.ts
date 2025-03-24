import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
})

async function createPlaylist(title: string, videoIds: string[]): Promise<void> {
  const res = await youtube.playlists.insert({
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

  const playlistId = res.data.id
  console.log(`✅ Created playlist: ${title} (https://www.youtube.com/playlist?list=${playlistId})`)

  for (const videoId of videoIds) {
    await youtube.playlistItems.insert({
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
  }
}

createPlaylist('🔥 Travis + Metro Heat', ['7EmZj9GB1TI', 'kH6jeLpyetE', 'tmzQFthKCus'])
  .then(() => {
    console.log('✅ Playlist created successfully')
  })
  .catch((error) => {
    console.error('❌ Error creating playlist:', error)
  })
