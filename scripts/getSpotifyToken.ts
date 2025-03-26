import express from 'express'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3000/redirect'

const SPOTIFY_SCOPES = [
  // Images
  'ugc-image-upload',

  // Spotify Connect
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',

  // Playback
  'app-remote-control',
  'streaming',

  // Playlists
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',

  // Follow
  'user-follow-modify',
  'user-follow-read',

  // Listening History
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',

  // Library
  'user-library-modify',
  'user-library-read',

  // Users
  'user-read-email',
  'user-read-private'
].join(' ')

const app = express()

app.get('/', (req, res) => {
  const authUrl = new URL('https://accounts.spotify.com/authorize')
  authUrl.searchParams.append('client_id', CLIENT_ID ?? '')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI)
  authUrl.searchParams.append('scope', SPOTIFY_SCOPES)

  res.redirect(authUrl.toString())
})

app.get('/redirect', async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const code = req.query.code as string

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      })
    })

    const data = await response.json()
    console.log({ data })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('✅ ACCESS TOKEN:', data.access_token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('✅ REFRESH TOKEN:', data.refresh_token)
    res.send('Tokens acquired. Check your terminal.')
  } catch (error) {
    console.error('Error getting tokens:', error)
    res.status(500).send('Error getting tokens')
  }
})

app.listen(3000, () => {
  console.log('Visit: http://localhost:3000 to start Spotify OAuth flow')
})
