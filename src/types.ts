import { z } from 'zod'

export const GeneratePlaylistSchema = z.object({
  artists: z.array(z.string()),
  adjectives: z.array(z.string()),
  maxReleaseDate: z.number(),
  numSongs: z.number(),
  title: z.string()
})

export type GeneratePlaylist = z.infer<typeof GeneratePlaylistSchema>

export const PlaylistSchema = z.object({
  playlist: z.array(z.string())
})

export type Playlist = z.infer<typeof PlaylistSchema>
