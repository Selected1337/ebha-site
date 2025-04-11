async function fetchStats() {
  const res = await fetch('../data/player_stats.json');
  const stats = await res.json();

  const table = document.getElementById("stats-body");

  Object.entries(stats).forEach(([player, s]) => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-100 transition";

    row.innerHTML = `
      <td class="p-2 flex items-center gap-2">
        <img src="https://minotar.net/avatar/${player}/25" class="rounded" />
        <a href="../players/${player}.html" class="hover:underline">${player}</a>
      </td>
      <td class="p-2 text-center">${s.gp}</td>
      <td class="p-2 text-center">${s.goals}</td>
      <td class="p-2 text-center">${s.assists}</td>
      <td class="p-2 text-center">${s.goals + s.assists}</td>
      <td class="p-2 text-center">${s.hits}</td>
      <td class="p-2 text-center">${s.touches}</td>
      <td class="p-2 text-center">${s.shots_against}</td>
      <td class="p-2 text-center">${s.saves}</td>
      <td class="p-2 text-center">${s.goals_against}</td>
      <td class="p-2 text-center">${(s.saves + s.goals_against > 0) ? ((s.saves / (s.saves + s.goals_against)) * 100).toFixed(1) : "0.0"}%</td>
      <td class="p-2 text-center">${(s.gp > 0) ? (s.goals_against / s.gp).toFixed(2) : "0.00"}</td>
    `;
    table.appendChild(row);
  });
}

// Sorting
document.querySelectorAll("th").forEach((header, index) => {
  header.addEventListener("click", () => sortTable(index));
});

function sortTable(colIndex) {
  const table = document.getElementById("stats-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const isNumber = colIndex !== 0;

  const sorted = rows.sort((a, b) => {
    const cellA = a.children[colIndex].textContent.trim().replace("%", "");
    const cellB = b.children[colIndex].textContent.trim().replace("%", "");
    return isNumber
      ? parseFloat(cellB) - parseFloat(cellA)
      : cellA.localeCompare(cellB);
  });

  tbody.innerHTML = "";
  sorted.forEach(row => tbody.appendChild(row));
}

fetchStats();
