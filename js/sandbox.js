document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const agentList = document.getElementById("agentList");

  // Fungsi untuk memuat data agen dari API
  const loadAgents = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menampilkan daftar agen
  const displayAgents = (agents) => {
    agentList.innerHTML = "";
    agents.forEach((agent) => {
      const listItem = document.createElement("li");
      listItem.textContent = agent.displayName;
      agentList.appendChild(listItem);
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
