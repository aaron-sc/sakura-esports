/* ==========================================================================
   Sakura Eclipse — Player profile page
   Depends on data.js (GAMES, escapeHtml, slugify, playerSlug, findPlayerBySlug).
   Reads ?p=<slug> and renders that player's profile, or a not-found state.
   ========================================================================== */

(function () {
  "use strict";

  function renderNotFound(heroEl, contentEl) {
    document.title = "Player Not Found — Sakura Eclipse";
    heroEl.innerHTML =
      '<div class="container">' +
      '<div class="eyebrow">Player Profile</div>' +
      '<h1>Not <span class="accent">Found</span></h1>' +
      "<p>We couldn't find a player at that link. They may have moved rosters, or the link is out of date.</p>" +
      "</div>";
    contentEl.innerHTML =
      '<div class="form-card" style="text-align:center;">' +
      '<a class="btn btn-primary" href="teams.html">View All Teams</a>' +
      "</div>";
  }

  function renderProfile(heroEl, contentEl, found) {
    var game = found.game;
    var team = found.team;
    var player = found.player;
    var teammates = found.teammates;

    document.title = player.name + " — Sakura Eclipse";

    heroEl.innerHTML =
      '<div class="container">' +
      '<div class="eyebrow">' +
      escapeHtml(game.name) +
      " — " +
      escapeHtml(team.tier) +
      "</div>" +
      "<h1>" +
      escapeHtml(player.name) +
      (player.captain
        ? ' <span class="captain-badge captain-badge--lg" title="Captain">C</span>'
        : "") +
      (player.igl
        ? ' <span class="role-badge role-badge--lg" title="In-Game Leader">IGL</span>'
        : "") +
      "</h1>" +
      "<p>" +
      escapeHtml(team.name) +
      (formatHandle(player) ? " · " + escapeHtml(formatHandle(player)) : "") +
      "</p>" +
      '<div style="margin-top:26px;">' +
      '<a class="btn btn-ghost" href="teams.html?game=' +
      encodeURIComponent(game.id) +
      '">&larr; Back to ' +
      escapeHtml(game.name) +
      "</a>" +
      "</div>" +
      "</div>";

    var bioHtml = player.bio
      ? '<p class="profile-bio">' + escapeHtml(player.bio) + "</p>"
      : '<p class="profile-placeholder">No bio yet — check back soon.</p>';

    var factsHtml;
    if (player.facts && player.facts.length) {
      factsHtml =
        '<ul class="facts-list">' +
        player.facts
          .map(function (f) {
            return "<li>" + escapeHtml(f) + "</li>";
          })
          .join("") +
        "</ul>";
    } else {
      factsHtml = '<p class="profile-placeholder">Nothing added yet.</p>';
    }

    var others = teammates.filter(function (p) {
      return p.name !== player.name;
    });
    var teammatesHtml;
    if (others.length) {
      teammatesHtml =
        '<div class="teammates-list">' +
        others
          .map(function (p) {
            var slug = playerSlug(game.id, team.name, p.name);
            return (
              '<a class="teammate-chip" href="player.html?p=' +
              encodeURIComponent(slug) +
              '">' +
              escapeHtml(p.name) +
              (p.isSub ? ' <span class="sub-tag">Sub</span>' : "") +
              "</a>"
            );
          })
          .join("") +
        "</div>";
    } else {
      teammatesHtml = '<p class="profile-placeholder">No other listed teammates.</p>';
    }

    contentEl.innerHTML =
      '<div class="form-card">' +
      '<div class="profile-section"><h2 class="profile-heading">About</h2>' +
      bioHtml +
      "</div>" +
      '<div class="profile-section"><h2 class="profile-heading">Facts</h2>' +
      factsHtml +
      "</div>" +
      '<div class="profile-section"><h2 class="profile-heading">Teammates</h2>' +
      teammatesHtml +
      "</div>" +
      "</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var heroEl = document.getElementById("player-hero");
    var contentEl = document.getElementById("player-content");
    if (!heroEl || !contentEl) return;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("p") || "";
    var found = slug ? findPlayerBySlug(slug) : null;

    if (found) {
      renderProfile(heroEl, contentEl, found);
    } else {
      renderNotFound(heroEl, contentEl);
    }
  });
})();
