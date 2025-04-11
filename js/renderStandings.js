async function loadStandings() {
  const res = await fetch('../data/standings.json');
  const data = await res.json();
  renderTable('league', data.league);
  renderTable('conference', data.conferences);
  renderTable('division', data.divisions);
  showTab('league');
}

function renderTable(type, standings) {
  const container = document.getElementById('standings-container');
  const div = document.createElement('div');
  div.id = type;
  div.className = "standings-tab hidden";

  if (type === "league") {
    div.innerHTML = generateTable(standings, "League Standings");
  } else {
    Object.entries(standings).forEach(([group, teams]) => {
      div.innerHTML += generateTable(teams, group);
    });
  }

  container.appendChild(div);
}

function generateTable(teams, title) {
  return `
    <h2 class="text-xl font-bold mt-6 mb-2">${title}</h2>
    <table class="w-full text-sm border mb-6">
      <thead class="bg-card">
        <tr>
          <th class="p-2 text-left">#</th>
          <th class="p-2 text-left">Team</th>
          <th class="p-2 text-center">GP</th>
          <th class="p-2 text-center">PTS</th>
          <th class="p-2 text-center">W</th>
          <th class="p-2 text-center">L</th>
          <th class="p-2 text-center">OTL</th>
          <th class="p-2 text-center">GF</th>
          <th class="p-2 text-center">GA</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        ${teams.map((team, i) => `
          <tr class="border-b">
            <td class="p-2">${i + 1}</td>
            <td class="p-2">${team.name}</td>
            <td class="p-2 text-center">${team.gp}</td>
            <td class="p-2 text-center">${team.pts}</td>
            <td class="p-2 text-center">${team.w}</td>
            <td class="p-2 text-center">${team.l}</td>
            <td class="p-2 text-center">${team.otl}</td>
            <td class="p-2 text-center">${team.gf}</td>
            <td class="p-2 text-center">${team.ga}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function showTab(tabName) {
  document.querySelectorAll(".standings-tab").forEach(tab => {
    tab.classList.add("hidden");
  });
  document.getElementById(tabName).classList.remove("hidden");

  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.remove("bg-black", "text-white");
  });
  const tabBtn = Array.from(document.querySelectorAll(".tab")).find(btn => btn.innerText.toLowerCase() === tabName);
  if (tabBtn) tabBtn.classList.add("bg-black", "text-white");
}

loadStandings();
