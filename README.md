# 🎧 VibeBot

**"Your personal AI-powered music curator."**

VibeBot is your plug for discovering 🔥 new music — from mainstream drops to underground gems.  
It generates **deeply personalized playlists** based on your taste, your mood, and the moment.  
Whether you’re vibing solo, throwing a house party, or exploring new sonic textures, VibeBot taps into a curated music brain trained on **official + unofficial releases**, stem-sourced transitions, and daily music drops across the internet.

![VibeBot Banner](./banner.png)

---

> **Note:** VibeBot is currently in **alpha** — actively learning, evolving, and vibing.  
> Expect rapid updates, better personalization, and deeper music understanding over time.

---

## ✨ Core Features

- 🧠 **Prompt-Based Playlist Generator**  
  Drop a vibe in natural language ("late night spacey trap like Don Toliver x Travis") — VibeBot builds the perfect sequence.

- 🔍 **Underground & Mainstream Discovery Engine**  
  Stay ahead of the curve with a blend of fresh heat from SoundCloud, YouTube, TikTok, and official releases — all tagged and indexed daily.

- 🎚 **AI-Curated Transitions**  
  Leverages metadata, BPM/key matching, and real-world DJ sets to generate transition-aware playlists that flow.

- 🔗 **Transition Memory**  
  Tracks which songs blend well together based on crowd-tested and AI-learned transitions.

- 💡 **Vibe Intelligence**  
  Analyzes song metadata + vibe descriptors (adjectives, genre, drop type, energy) to match your mood and setting.

- 🧾 **Transparent Taste**  
  Every playlist comes with track-level explanations: why it was picked, what vibe it matches, and how it fits into the flow.

- 📦 **Personal Crate Curation**  
  Import your YouTube Likes and tag your music. VibeBot learns your style and evolves with your taste.

---

## 🔥 Example Use Cases

### 🧠 Conversation 1 — New Music Exploration

**Q:** Give me a moody, emotional hip-hop playlist like 6lack x Brent Faiyaz but with less mainstream songs.

**A:** Say less. I’ll pull some underground R&B/hip-hop blends with low popularity scores but heavy soul.  
Here’s a 12-track playlist built for solo night drives: `https://youtube.com/playlist-link`

---

### 🎉 Conversation 2 — Personalized Party Vibes

**Q:** I want a party playlist that slaps. Think Travis + Metro Boomin energy, but surprise me with some unreleased or flipped remixes.

**A:** Bet. Mixing official bangers with some SoundCloud-level edits.  
Transitions are smooth, BPM stays above 115.  
Playlist dropped: `https://youtube.com/playlist-link`

---

### 🔁 Conversation 3 — Daily Drop Recommendations

**Q:** What’s new today I might like? I want something dark, bouncy, and not chart-topping.

**A:** Here’s what just got indexed that matches your vibe:

- **Artist A – track** (underground bounce)
- **Artist B – unreleased freestyle**
- **Artist C – dark synthy remix of Future’s “WAIT FOR U”**

All picked just for you. Want me to build a playlist outta these?

---

## 💸 Monetization

- **Free Plan**  
  Access vibe-based playlists, music recommendations, and tagging tools — powered by your curation.

- **Premium Plan**  
  $20/month via Stripe  
  Unlocks:
  - Unlimited playlist generation
  - Playlist download tools (YouTube > audio)
  - Early access to new AI models

---

## 🛠 Powered By

- 🧠 Embedding & Semantic Search (OpenAI/Cohere)
- 🧾 Custom Metadata Indexing (Title, BPM, Key, Mood, Vibe)
- 🧮 Vector DB for vibe search (pgvector)
- 🧠 Scoring engine for intent-to-playlist matching

---

## 🚀 Getting Started

```bash
git clone https://github.com/avp1598/vibe-bot.git
cd vibe-bot
bun install
bun dev
```
