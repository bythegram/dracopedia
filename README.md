<div align="center">
<img width="1200" height="475" alt="Dracopedia Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Dracopedia: The Field Guide to Dragons

An interactive dragon encyclopedia built with React and Vite. Browse the **Draconic Archive**, read detailed lore entries for each dragon, and explore survival guides for dragon hunters and tamers alike.

## Features

- **Dragon Codex** — Browse a full catalog of dragons, filterable by rarity (Common → Legendary) and searchable by name or species
- **Detail Pages** — Each dragon entry includes habitat, personality, power level, difficulty rating, diet, nesting grounds, and more
- **Lore Compendium** — In-world extras: a Draconic phrasebook, baby dragon care tips, and a dragon-hunting packing list
- **Animated UI** — Smooth transitions powered by Motion

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion)
- Google Gemini AI (`@google/genai`)
- Lucide React icons

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── App.tsx           # Main app shell, routing, and layout
├── data/
│   ├── dragons.ts    # Dragon entries and stats
│   ├── lore.ts       # Phrasebook, baby care tips, packing list
│   └── types.ts      # Rarity and Difficulty enums
└── images/           # Dragon artwork (.webp)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with `tsc --noEmit` |
