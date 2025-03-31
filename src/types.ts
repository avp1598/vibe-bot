import { z } from 'zod'

export const GeneratePlaylistSchema = z.object({
  artists: z.array(z.string()),
  minReleaseDate: z.number(),
  maxReleaseDate: z.number(),
  numSongs: z.number(),
  title: z.string()
})

export type GeneratePlaylist = z.infer<typeof GeneratePlaylistSchema>

export const PlaylistSchema = z.object({
  playlist: z.array(
    z.object({
      artist: z.string(),
      id: z.string(),
      is_seed: z.boolean(),
      release_date: z.string(),
      title: z.string()
    })
  )
})

export type Playlist = z.infer<typeof PlaylistSchema>
