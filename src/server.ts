import { PlaylistSchema, type GeneratePlaylist, type Playlist } from '@/types'
import { PYTHON_SERVER_URL } from '@/constants'

export async function generatePlaylist(playlist: GeneratePlaylist): Promise<Playlist> {
  const response = await fetch(`${PYTHON_SERVER_URL}/generate-playlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playlist)
  })

  if (!response.ok) {
    throw new Error('Failed to generate playlist')
  }

  return PlaylistSchema.parse(await response.json())
}
