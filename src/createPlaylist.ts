import type { Action, Content, HandlerCallback, IAyaRuntime, Memory, State } from '@tribesxyz/ayaos'

// FIXME: fix types
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeContext, generateObject, ModelClass } from '@elizaos/core'

import { ayaLogger } from '@tribesxyz/ayaos'
import { z } from 'zod'

const PlaylistScoringProfileSchema = z.object({
  context: z.enum(['party', 'exploration', 'gym', 'chill', 'study', 'mix']),
  embeddingWeight: z.number().min(0).max(1),
  popularityWeight: z.number().min(0).max(1),
  bpmWeight: z.number().min(0).max(1),
  artistWeight: z.number().min(0).max(1),
  artistBias: z.array(z.string()),
  preferredAdjectives: z.array(z.string()),
  maxPopularity: z.number().min(0).max(100).optional()
})

export interface PlaylistScoringContent extends Content {
  context: string
  embeddingWeight: number
  popularityWeight: number
  bpmWeight: number
  artistWeight: number
  artistBias: string[]
  preferredAdjectives: string[]
  maxPopularity?: number
}

const scoringProfileTemplate = `
You are a music recommendation engine that parses natural language playlist prompts and 
returns a scoring profile.

Your job is to interpret the intent, context, energy, and preferences from the prompt and respond 
with:
- context: one of ["party", "exploration", "gym", "chill", "study", "mix"]
- embeddingWeight: how important is the overall vibe match (0-1)
- popularityWeight: how important is popularity (0-1)
- bpmWeight: how important is tempo/energy (0-1)
- artistWeight: how important are the mentioned artists (0-1)
- artistBias: artists the user wants to hear
- preferredAdjectives: words that describe the desired vibe (e.g., "moody", "trap", "banger")
- maxPopularity: optional cap on popularity (0-100)

Conversation:
{{recentMessages}}

Respond with a JSON object.
`

export const parsePlaylistPromptAction: Action = {
  name: 'PARSE_PLAYLIST_PROMPT',
  similes: ['GET_SCORING_PROFILE', 'ANALYZE_VIBE_PROMPT'],
  description: 'Parses a user music prompt and generates a scoring profile',
  validate: async () => true,
  handler: async (
    runtime: IAyaRuntime,
    message: Memory,
    state?: State,
    options?: { [key: string]: unknown },
    callback?: HandlerCallback
  ): Promise<boolean> => {
    ayaLogger.info('Starting PARSE_PLAYLIST_PROMPT handler...')

    if (!state) {
      state = await runtime.composeState(message)
    } else {
      state = await runtime.updateRecentMessageState(state)
    }

    const context = composeContext({
      state,
      template: scoringProfileTemplate
    })

    const raw = (
      await generateObject({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
        schema: PlaylistScoringProfileSchema
      })
    ).object

    const scoringProfile = PlaylistScoringProfileSchema.parse(raw)

    if (callback) {
      await callback({
        text: `Scoring profile generated ✅: ${JSON.stringify(scoringProfile, null, 2)}`,
        content: scoringProfile
      })
    }

    return true
  },
  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Make me a party playlist with high energy trap bangers, mostly Carti and Travis, not too mainstream'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Scoring profile generated ✅'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'I need a hip hop playlist with classic 90s tracks, think Nas and Biggie'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Scoring profile generated ✅'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Create a workout playlist with high tempo hip-hop tracks, lots of Kendrick and J. Cole'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Scoring profile generated ✅'
        }
      }
    ],
    [
      {
        user: '{{user1}}',
        content: {
          text: 'I want a chill hip hop playlist for a Sunday morning, with artists like Mac Miller and Chance the Rapper'
        }
      },
      {
        user: '{{user2}}',
        content: {
          action: 'PARSE_PLAYLIST_PROMPT',
          text: 'Scoring profile generated ✅'
        }
      }
    ]
  ]
}
