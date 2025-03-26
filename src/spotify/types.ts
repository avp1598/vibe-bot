import { z } from 'zod'

export const SpotifyArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.literal('artist')
})

export const SpotifyArtistSearchSchema = z.object({
  artists: z.object({
    items: z.array(SpotifyArtistSchema)
  })
})

export const SpotifyAlbumSchema = z.object({
  id: z.string(),
  name: z.string(),
  release_date: z.string().optional(),
  type: z.union([z.literal('album'), z.literal('single')])
})

export const SpotifyAlbumsResponseSchema = z.object({
  items: z.array(SpotifyAlbumSchema)
})

export const SpotifyTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.array(
    z.object({
      name: z.string()
    })
  ),
  available_markets: z.array(z.string()),
  disc_number: z.number(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: z.record(z.string()),
  href: z.string(),
  preview_url: z.string().nullable(),
  track_number: z.number(),
  type: z.literal('track'),
  uri: z.string(),
  is_local: z.boolean()
})

export const SpotifyTracksResponseSchema = z.object({
  items: z.array(SpotifyTrackSchema)
})

export const SpotifyAudioFeaturesSchema = z.object({
  id: z.string(),
  tempo: z.number(),
  key: z.number()
  // Add other audio features as needed
})

export const SpotifyAudioFeaturesResponseSchema = z.object({
  audio_features: z.array(SpotifyAudioFeaturesSchema.nullable())
})

// Export types derived from schemas
export type SpotifyArtist = z.infer<typeof SpotifyArtistSchema>
export type SpotifyAlbum = z.infer<typeof SpotifyAlbumSchema>
export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>
export type SpotifyAudioFeatures = z.infer<typeof SpotifyAudioFeaturesSchema>
