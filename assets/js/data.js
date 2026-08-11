/* ==========================================================================
   Sakura Eclipse — Org data
   Single source of truth for games + rosters, consumed by index.html,
   teams.html, and player.html. Edit here to update the whole site.

   To add facts/bio to a player later, just add fields to their object
   in a team's `roster` or `subs` array, e.g.:
     { name: "zeil", handle: "@Z3ilTwitch", captain: true,
       bio: "IGL, been with the org since season 1.",
       facts: ["Plays Jett/Chamber", "Also streams on Twitch"] }
   player.html picks up `bio` and `facts` automatically if present.
   ========================================================================== */

const DISCORD_URL = "https://discord.gg/PthEkdVx4A";

const GAMES = [
  {
    id: "valorant",
    name: "VALORANT",
    badge: "VAL",
    blurb: "Tactical 5v5 shooter — precision utility and clutch-factor gunplay.",
    teams: [
      {
        name: "Sakura Eclipse White",
        tier: "Main Roster",
        roster: [
          { name: "zeil", handle: "@Z3ilTwitch", captain: true },
          { name: "Ukiy0", handle: "@Jadenx10_" },
          { name: "gigaberry", handle: "@gigaberry406" }
        ],
        subs: [
          { name: "K11z", handle: "@k11z" },
          { name: "solaine", handle: "@solaineval" }
        ]
      },
      {
        name: "Sakura Eclipse Black",
        tier: "Secondary Roster",
        roster: [
          { name: "Jaylen", handle: "@jay_kizzy35322" },
          { name: "OnlyBuds", handle: "@OnlyBudsG" },
          { name: "Tanuki", handle: "@TrashPanda_san" },
          { name: "TrexDuh", handle: "@lexahwa" },
          { name: "Zigz", handle: "@tapecowboy" }
        ],
        subs: []
      },
      {
        name: "Sakura Eclipse Pink",
        tier: "Academy+ Roster",
        roster: [
          { name: "Swaggy", handle: "@SwaggyLor" },
          { name: "Royal", handle: "@official_r0yal1" },
          { name: "Milk", handle: "@callm3milk" },
          { name: "BlueTarget", handle: "BlueTarget|B.T." },
          { name: "Flimseycrumb", handle: "" }
        ],
        subs: [{ name: "Nut", handle: "" }]
      }
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

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function playerSlug(gameId, teamName, playerName) {
  return gameId + "--" + slugify(teamName) + "--" + slugify(playerName);
}

// Looks up a player by their URL slug (see playerSlug above). Returns
// { game, team, player, teammates } — teammates is the full roster+subs
// list of the same team, each tagged with isSub — or null if not found.
function findPlayerBySlug(slug) {
  for (var gi = 0; gi < GAMES.length; gi++) {
    var g = GAMES[gi];
    for (var ti = 0; ti < g.teams.length; ti++) {
      var t = g.teams[ti];
      var roster = (t.roster || []).map(function (p) {
        return Object.assign({ isSub: false }, p);
      });
      var subs = (t.subs || []).map(function (p) {
        return Object.assign({ isSub: true }, p);
      });
      var all = roster.concat(subs);
      for (var pi = 0; pi < all.length; pi++) {
        if (playerSlug(g.id, t.name, all[pi].name) === slug) {
          return { game: g, team: t, player: all[pi], teammates: all };
        }
      }
    }
  }
  return null;
}
