# 🎧 VibeBot

**"Your personal AI-powered music curator."**

VibeBot is your plug for discovering 🔥 new music — from mainstream drops to underground gems.  
It generates **deeply personalized playlists** based on your taste, your mood, and the artists you vibe with.  
Whether you're chilling solo, throwing a house party, or exploring new sonic textures, VibeBot leverages cutting-edge AI to find tracks that match your exact vibe.

![VibeBot Banner](./banner.webp)

---

> **Note:** VibeBot is currently in **alpha** — actively learning, evolving, and vibing.  
> Expect rapid updates, better personalization, and deeper music understanding over time.

---

## ✨ Core Features

- 🧠 **Smart Playlist Generator**  
  Tell us your favorite artists, describe the vibe you want ("chill," "hypnotic," "energetic"), and set any time constraints — VibeBot builds the perfect sequence.

- 🔍 **Advanced Music Embedding**  
  Using CLMR (Contrastive Learning of Musical Representations) technology to understand the actual sonic qualities of each track, not just metadata.

- 🎚 **Sonic Similarity Search**  
  Sophisticated vector search finds songs that genuinely sound similar based on their audio characteristics, not just genre tags.

- 🧮 **Progressive Filter Relaxation**  
  Our intelligent algorithm progressively relaxes your criteria when needed to ensure you always get a full playlist that stays true to your original request.

- 💡 **Vibe Intelligence**  
  Understand songs beyond basic metadata using rich adjective tagging that captures mood, energy, and sonic texture.

- 🔄 **Musical Journey Creation**  
  Playlists evolve naturally between tracks, creating a cohesive listening experience that flows from one song to the next.

- 📦 **Instant Playback Integration**  
  Every song in your playlist is instantly available to play through YouTube integration.

---

## 🔥 Example Use Cases

### 🧠 Conversation 1 — Artist-Based Discovery

**Q:** Create a playlist with Travis Scott, 21 Savage, and Metro Boomin that feels chill.

**A:** Got you covered! Here's a playlist featuring these artists with their most laid-back tracks and some sonically similar vibes that match the chill energy you're looking for.

---

### 🎉 Conversation 2 — Era & Mood Exploration

**Q:** I want music that feels hypnotic and dreamy, mostly from artists before 2020.

**A:** Perfect! I've crafted a hypnotic playlist with songs released before 2020. These tracks share similar sonic characteristics and maintain that dreamy atmosphere throughout.

---

### 🔄 Conversation 3 — Mixed Criteria Playlist

**Q:** Give me 15 tracks that sound like early Drake but with newer artists that match his emotional vibe.

**A:** Here's your playlist with 15 tracks that capture that emotional Drake essence but with contemporary artists. I've used sonic similarity to find tracks that genuinely match his early sound.

---

## 🛠 Under The Hood

- **CLMR Embedding Model**: Converts complex audio characteristics into vector embeddings
- **ChromaDB**: Vector database for lightning-fast similarity search
- **Progressive Relaxation Algorithm**: Smart filtering system that ensures you always get the number of songs you request
- **YouTube Integration**: Seamless playback of your generated playlists

---

## 🚀 Getting Started

```bash
git clone https://github.com/avp1598/vibe-bot.git
cd vibe-bot
bun install
bun dev
```

---

## 🌐 How It Works

1. **Song Embedding**: Each track is processed through the CLMR model to create a 1024-dimensional vector capturing its sonic qualities
2. **Metadata Enrichment**: Songs are tagged with artist, release date, and descriptive adjectives
3. **Vector Storage**: All embeddings and metadata are stored in ChromaDB for fast retrieval
4. **Smart Querying**: When you request a playlist, we use vector similarity and progressive filter relaxation to find perfect matches
5. **Playlist Building**: Starting with a seed song, we build a cohesive journey that maintains your requested vibe

The system uses cutting-edge AI to understand music on a fundamental level, going beyond simple genre matching to truly capture the feel and sound you're looking for.
