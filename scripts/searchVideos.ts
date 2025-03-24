import { google } from 'googleapis'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { createPlaylist } from './createPlaylist'

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

async function searchVideos(query: string, maxResults = 1): Promise<string[]> {
  const res = await youtube.search.list({
    part: ['snippet'],
    q: query,
    maxResults,
    type: ['video']
  })

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const videoIds = res.data.items?.map((item) => item.id?.videoId).filter(Boolean) as string[]

  if (!videoIds.length) {
    console.warn(`⚠️ No results found for "${query}"`)
  }

  return videoIds
}

async function run(): Promise<void> {
  const searchQueries = [
    'Travis Scott - Highest in the Room',
    'Metro Boomin - Superhero',
    'Don Toliver - After Party'
  ]

  const allVideoIds: string[] = []

  for (const q of searchQueries) {
    const [id] = await searchVideos(q)
    if (id) allVideoIds.push(id)
  }

  await createPlaylist('🌀 Travis x Metro Vibez', allVideoIds)
}

run().catch(console.error)
