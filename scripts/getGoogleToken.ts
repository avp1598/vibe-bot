import express from 'express'
import { google } from 'googleapis'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const app = express()

app.get('/', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube']
  })
  res.redirect(authUrl)
})

app.get('/oauth2callback', async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const code = req.query.code as string
  const { tokens } = await oauth2Client.getToken(code)
  console.log('✅ REFRESH TOKEN:', tokens.refresh_token)
  res.send('Token acquired. Check your terminal.')
})

app.listen(3000, () => {
  console.log('Visit: http://localhost:3000 to start OAuth flow')
})
