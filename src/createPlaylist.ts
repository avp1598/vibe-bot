import type { Action, Content, HandlerCallback, IAyaRuntime, Memory, State } from '@tribesxyz/ayaos'

import { ayaLogger, composeContext, generateObject, ModelClass } from '@tribesxyz/ayaos'
import { GeneratePlaylistSchema } from '@/types'
import { generatePlaylist } from '@/server'
import { youTubeClient } from '@/youtube'

export interface GeneratePlaylistContent extends Content {
  artists: string[]
  adjectives: string[]
  maxReleaseDate: number
  numSongs: number
}

const playlistGenerationTemplate = `
You are a music recommendation assistant that converts natural language requests into structured 
API parameters for a playlist generation system.

Your job is to analyze the user's request and extract the relevant information to create a 
well-formed body payload for the /generate-playlist endpoint.

Convert the user's input into the following JSON format:
{
  "artists": ["Artist Name", "Travis Scott", "Drake", ...],  // List of artists properly capitalized
  "maxReleaseDate": YYYY,                  // Optional maximum release year (e.g. 2024)
  "minReleaseDate": YYYY,                  // Optional minimum release year (e.g. 2024)
  "numSongs": N,                           // Number of songs requested (default: 10)
  "title": "Playlist Title"                // Banger title of the playlist
}

Guidelines:
- Include only artists that are clearly desired in the playlist
- Infer a reasonable maxReleaseDate if time periods are mentioned, default to 2025
- Determine an appropriate numSongs based on context or default to 10
- If the user does not mention artists, just return empty arrays for artists

Conversation:
{{recentMessages}}

Respond with a JSON object only. No explanations or additional text.
`

export const parsePlaylistPromptAction: Action = {
  name: 'GENERATE_PLAYLIST',
  similes: ['CREATE_PLAYLIST', 'GENERATE_PLAYLIST'],
  description: 'Generates a playlist params based on a user prompt',
  validate: async () => true,
  handler: async (
    runtime: IAyaRuntime,
    message: Memory,
    state?: State,
    options?: { [key: string]: unknown },
    callback?: HandlerCallback
  ): Promise<boolean> => {
    ayaLogger.info('Starting GENERATE_PLAYLIST handler...')

    if (!state) {
      state = await runtime.composeState(message)
    } else {
      state = await runtime.updateRecentMessageState(state)
    }

    try {
      const context = composeContext({
        state,
        template: playlistGenerationTemplate
      })

      const raw = (
        await generateObject({
          runtime,
          context,
          modelClass: ModelClass.LARGE,
          schema: GeneratePlaylistSchema
        })
      ).object

      const generatePlaylistContent = GeneratePlaylistSchema.parse(raw)

      const { playlist } = await generatePlaylist(generatePlaylistContent)

      const playlistId = await youTubeClient.createPlaylist(
        generatePlaylistContent.title,
        playlist.map((p) => p.id)
      )

      if (callback) {
        await callback({
          text: `Checkout your playlist here: https://www.youtube.com/playlist?list=${playlistId}`
        })
      }
    } catch (error) {
      ayaLogger.error('Error creating playlist', error)
      if (callback) {
        await callback({
          text:
            'Error creating playlist, error: ' +
            (error instanceof Error ? error.message : String(error))
        })
      }
    }

    return true
  },
  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Make me a 20 song playlist with high energy trap bangers, mostly Carti and Travis'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Generating your playlist, hold tight...'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Give me a hypnotic, psychedelic playlist with a lot of bass'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Generating your playlist, hold tight...'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Create a workout playlist with old (<2020) bangers from Travis Scott and 21 Savage and Offset'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Generating your playlist, hold tight...'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'I want a chill hip hop playlist for a Sunday morning with Migos and Drake'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Generating your playlist, hold tight...'
        }
      }
    ]
  ]
}
