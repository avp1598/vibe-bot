# 🎧 VibeBot

**"Your personal AI DJ mixing assistant."**  
VibeBot helps DJs, producers, and music lovers curate smooth transitions, generate vibe-perfect playlists, and manipulate tracks with deep intelligence — from BPM/key matching to stem extraction.

![VibeBot Banner](./banner.png)

---

**Note: VibeBot is currently in alpha and is not ready for production use. Features and functionalities are subject to change as we continue to develop and improve the platform.**

---

## ✨ Features

- 🎛 **Smart Transitions**  
  Get recommendations for the next track based on BPM, key, and vibe — perfect for live DJ sets and mixes.

- 🎶 **Playlist Generator**  
  Create seamless playlists around specific moods, genres, or artists using clustering and embedding models.

- 🧠 **Contextual Chat**  
  Ask anything from "what’s a good follow-up to this track?" to "make me a banger house party mix" — VibeBot understands.

- 🎧 **Audio Stem Extraction**  
  Automatically separate vocals and instrumentals from any song using AI-powered tools.

- 🛠 **Tempo & Pitch Adjustment**  
  Match BPM or keys between tracks effortlessly to ensure smooth transitions.

- 🔎 **Track Intelligence**  
  Retrieve BPM, key, genre, and more for any song using song metadata APIs.

- 📥 **Track Downloader**  
  Pull and prep audio files directly within the agent (supports local and cloud sources).

---

## 🧠 Example Conversations

### 🎚️ Conversation 1 — Mixing Suggestions + Stems

**Q:** Can you recommend a deep Metro Boomin instrumental that would work well with Kendrick Lamar's _HUMBLE._?

**A:** Try using the instrumental from _All The Money_ by Metro Boomin. It's at 140 BPM, so you'll want to slow down _HUMBLE._ by about 10 BPM to match for a smoother blend.

**Q:** Can you rip out the instrumental and the acapella for me?

**A:** Got it. Give me a moment to separate the stems...

**A:** Done ✅ — `humble_acapella.mp3` & `all_the_money_instrumental.mp3` are ready.

---

### 🎉 Conversation 2 — Party Playlist Generation

**Q:** I’m throwing a house party and want a high-energy hip-hop playlist. Think Travis Scott and Metro Boomin vibes. Keep transitions smooth.

**A:** Sounds fun! I’ll generate a playlist that keeps the energy up and matches BPM/key for seamless transitions.

**A:** Here’s a 10-track playlist to get you started: `https://youtube.com/playlist-link`

---

### 🔁 Conversation 3 — DJ Mix Transition Help

**Q:** I’m in the middle of a hip-hop DJ mix. Just played _Highest in the Room_ by Travis Scott. What track should I drop next for a smooth transition?

**A:** Based on the BPM and key, here are some great options to follow up with:

- _After Party_ – Don Toliver
- _No Bystanders_ – Travis Scott
- _Ric Flair Drip_ – Offset & Metro Boomin
- _Praise The Lord_ – A$AP Rocky ft. Skepta

Let me know if you want me to analyze transitions or tempo-match them for you.

---

## 💸 Monetization

- **Free Plan**  
  Stake a small amount of $VIBE to access core features.

- **Premium Plan**  
  $20/month via Stripe — unlocks advanced stem separation, unlimited playlists, and faster processing.

---

## 🛠 Tools Required / Integrated

- 🎵 Song Info Retrieval (BPM + Key)
- 🎙️ Audio Separation (Stem splitting)
- ⏱ Audio Processing (Tempo, pitch, alignment)
- 📊 Playlist Clustering (Embeddings + ML)
- 🔊 Audio Playback & Preview

---

## 🚀 Getting Started

```bash
git clone https://github.com/avp1598/vibe-bot.git
cd vibe-bot
bun install
bun dev
```
