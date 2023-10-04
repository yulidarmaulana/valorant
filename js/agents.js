document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const agentsContainer = document.getElementById("agents");

  // Fungsi untuk memuat data agen dari API
  const loadAgents = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      if (response.status !== 200) {
        throw new Error("Response error: " + response.status);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menampilkan daftar agent
  const displayAgents = (agents) => {
    agentsContainer.innerHTML = "";
    agents.forEach((agent) => {
      agentsContainer.innerHTML += `
                <a href="agent.html?id=${agent.uuid}" onclick="console.log('${agent.displayName}')" class="block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <img class="mx-auto rounded-md shadow-md" src="${agent.displayIcon}">
                  <p class="text-md my-4 text-white font-bold dark:text-gray-400">${agent.displayName}</p>
                </a>
              `;
    });
  };
  
  // Fungsi untuk melakukan pencarian agen
  const searchAgents = async () => {
    const searchText = searchInput.value.toLowerCase();
    const agents = await loadAgents();
    const filteredAgents = agents.filter((agent) =>
      agent.displayName.toLowerCase().includes(searchText)
    );
    displayAgents(filteredAgents);
  };

  // Memanggil fungsi pencarian saat input berubah
  searchInput.addEventListener("input", searchAgents);

  // Memuat dan menampilkan daftar agen saat halaman dimuat
  loadAgents().then((agents) => {
    displayAgents(agents);
  });
});
