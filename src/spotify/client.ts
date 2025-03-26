import { z } from 'zod'
import type {
  SpotifyArtist,
  SpotifyAlbum,
  SpotifyTrack,
  SpotifyAudioFeatures
} from '@/spotify/types'
import {
  SpotifyArtistSearchSchema,
  SpotifyAlbumsResponseSchema,
  SpotifyTracksResponseSchema,
  SpotifyAudioFeaturesResponseSchema
} from '@/spotify/types'

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'

const accessToken = process.env.SPOTIFY_ACCESS_TOKEN
if (!accessToken) throw new Error('Missing SPOTIFY_ACCESS_TOKEN')

async function spotifyGET<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Spotify API error: ${res.status} ${err}`)
  }
  const data = await res.json()
  //   console.dir({ data }, { depth: null })
  return schema.parse(data)
}

export async function searchArtist(name: string): Promise<SpotifyArtist | null> {
  const result = await spotifyGET(
    `/search?q=${encodeURIComponent(name)}&type=artist`,
    SpotifyArtistSearchSchema
  )
  return result.artists.items[0] || null
}

export async function getArtistAlbums(artistId: string): Promise<SpotifyAlbum[]> {
  const result = await spotifyGET(
    `/artists/${artistId}/albums?include_groups=album,single&limit=50`,
    SpotifyAlbumsResponseSchema
  )
  return result.items
}

export async function getAlbumTracks(albumId: string): Promise<SpotifyTrack[]> {
  const result = await spotifyGET(`/albums/${albumId}/tracks?limit=50`, SpotifyTracksResponseSchema)
  return result.items
}

export async function getAudioFeatures(
  trackIds: string[]
): Promise<Record<string, SpotifyAudioFeatures>> {
  console.log({ trackIds })
  const chunks = chunkArray(trackIds, 100)
  const results: Record<string, SpotifyAudioFeatures> = {}

  for (const chunk of chunks) {
    const idsParam = chunk.join(',')
    const res = await spotifyGET(
      `/audio-features?ids=${idsParam}`,
      SpotifyAudioFeaturesResponseSchema
    )
    for (const f of res.audio_features) {
      if (f) results[f.id] = f
    }
  }

  return results
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
