export const PHRASES = [
  { phrase: "Rawr-shhh", meaning: "Hello / I come in peace." },
  { phrase: "Klik-Klik-Vrrr", meaning: "Thank you for the snack." },
  { phrase: "Whis-too-low", meaning: "Where is the treasure?" },
  { phrase: "Grooo-mmm", meaning: "I am sleepy / Goodnight." },
  { phrase: "Sss-hiss-pop", meaning: "Warning! (Usually said by Fire Dragons)." },
];

export const BABY_CARE = [
  { category: "Warmth", tip: "Keep all baby dragons wrapped in a soft blanket, except for Ice Dragons (they prefer a bucket of snow)." },
  { category: "Playtime", tip: "Baby Forest Dragons love to play hide-and-seek. Baby Flower Dragons love it when you whistle tunes to them." },
  { category: "Exercise", tip: "Let baby Fire Dragons chase small sparks (under supervision!) to help them learn to fly." },
  { category: "Naptime", tip: "Shadow Dragon babies need a very dark, quiet box to sleep in during the day." },
  { category: "Bath Time", tip: "Use only rainwater for Water Dragons. Never get a Fire Dragon baby wet—they will get grumpy and \"sizzle.\"" },
];

export interface PackingItem {
  item: string;
  requirement: string;
  whereToFind: string;
  howToUse: string;
  protectedBy: string[];
}

export const PACKING_LIST: PackingItem[] = [
  {
    item: "The 'Glow-Compass'",
    requirement: "General",
    whereToFind: "Issued at Council waystations and tucked into most ranger caches near old crossroads.",
    howToUse: "Hold it level and whisper your destination. The needle turns toward the safest draconic route rather than the shortest road.",
    protectedBy: ["The Verdant Sylph", "The Iris Prism-Tail"],
  },
  {
    item: "Enchanted Sketchbook",
    requirement: "General",
    whereToFind: "Available from Archivist Scribes in mountain libraries and traveling cartographer caravans.",
    howToUse: "Sketch tracks, scales, or nests; the pages annotate your drawing with hidden ward marks visible at moonrise.",
    protectedBy: ["The Flora Nymph", "The Obsidian Umbra"],
  },
  {
    item: "Heat-Shield Umbrella",
    requirement: "Fire",
    whereToFind: "Forged by kiln-smiths in volcanic settlements near active calderas.",
    howToUse: "Deploy before entering ashfall. Rotate the ferrule to vent excess heat and keep the canopy from overcharging.",
    protectedBy: ["The Solar Ignis", "The Zenith Aether"],
  },
  {
    item: "Self-Warming Parka",
    requirement: "Ice",
    whereToFind: "Woven in tundra monasteries from frost-wool and star-thread.",
    howToUse: "Tap the silver clasp twice to activate. Keep one vent open so body heat can circulate without icing the lining.",
    protectedBy: ["The Frost-Bane Borealis", "The Verdant Sylph"],
  },
  {
    item: "Bubble-Helmet",
    requirement: "Water",
    whereToFind: "Stored in pearl vaults beneath reef outposts and sold in select harbor guildhouses.",
    howToUse: "Seal the collar, then dip the crown rune underwater to start the breathing bubble. Refill at any clean tide pool.",
    protectedBy: ["The Abyssal Leviathan", "The Iris Prism-Tail"],
  },
  {
    item: "Moonlight Lantern",
    requirement: "Shadow",
    whereToFind: "Recovered from eclipse shrines and obsidian markets that open only after dusk.",
    howToUse: "Expose it to moonlight for one minute, then shutter the lens halfway to reveal hidden cave markings and false walls.",
    protectedBy: ["The Obsidian Umbra", "The Gilded Aurelius"],
  },
];
