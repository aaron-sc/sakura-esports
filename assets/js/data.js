/* ==========================================================================
   Sakura Eclipse — Org data
   Single source of truth for games + rosters, consumed by index.html
   and teams.html. Edit here to update the whole site.
   ========================================================================== */

const DISCORD_URL = "https://discord.gg/PthEkdVx4A";

const GAMES = [
  {
    id: "valorant",
    name: "VALORANT",
    badge: "VAL",
    blurb: "Tactical 5v5 shooter — precision utility and clutch-factor gunplay.",
    teams: [
      { name: "Sakura Eclipse White", tier: "Main Roster" },
      { name: "Sakura Eclipse Black", tier: "Secondary Roster" },
      { name: "Sakura Eclipse Pink", tier: "Academy+ Roster" }
    ]
  },
  {
    id: "r6",
    name: "Rainbow Six Siege",
    badge: "R6",
    blurb: "Our deepest pipeline — six rosters spanning open, all-ages, and U18 play.",
    teams: [
      { name: "Sakura Eclipse", tier: "Main Roster" },
      { name: "Sakura Eclipse Vanguard", tier: "Secondary Roster" },
      { name: "Sakura Eclipse ELITE", tier: "All-Ages Roster" },
      { name: "Sakura Eclipse Moon", tier: "U18 Main Roster" },
      { name: "Sakura Eclipse SUN", tier: "U18 Secondary Roster" },
      { name: "Sakura Eclipse ACAD", tier: "Academy Roster" }
    ]
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    badge: "CS2",
    blurb: "Round-based competitive FPS at the highest level of precision.",
    teams: [{ name: "Sakura Eclipse", tier: "Main Roster" }]
  },
  {
    id: "overwatch",
    name: "Overwatch 2",
    badge: "OW",
    blurb: "Hero-shooter team fights built on coordination, comps, and swaps.",
    teams: [{ name: "Sakura Eclipse", tier: "Main Roster" }]
  },
  {
    id: "rocketleague",
    name: "Rocket League",
    badge: "RL",
    blurb: "High-octane car soccer — mechanics, rotation, and boost control.",
    teams: [{ name: "Sakura Eclipse", tier: "Main Roster" }]
  }
];

const TOTAL_TEAMS = GAMES.reduce((sum, g) => sum + g.teams.length, 0);
