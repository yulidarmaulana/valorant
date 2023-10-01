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

  // Fungsi untuk menampilkan daftar agen
  const displayAgents = (agents) => {
    agentsContainer.innerHTML = "";
    agents.forEach((agent) => {
      agentsContainer.innerHTML += `
                <a href="#" class="block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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

// onload player cards
fetch("https://valorant-api.com/v1/playercards").then(function (response) {
  if (response.status != 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }

  response.json().then(function (data) {
    console.log(data);

    const cards = data.data;
    cards.slice(0, cards.length / 2).forEach((card) => {
      document.getElementById("cards").innerHTML += `
                <a href="#" class="block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                     <img class="mx-auto rounded-md p-2" src="${card.largeArt}">
                     <img class="mx-auto p-2 rounded-md shadow-md" src="${card.wideArt}">
                    <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${card.displayName}</p>                        
                </a>
        `;
    });
  });
});

// onload maps
fetch("https://valorant-api.com/v1/maps").then(function (response) {
  if (response.status != 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }

  response.json().then(function (data) {
    console.log(data);

    const maps = data.data;
    maps.forEach((maps) => {
      document.getElementById("maps").innerHTML += `
            <a href="#" class="block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img class="mx-auto rounded-md " src="${maps.splash}">
                <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${maps.displayName}</p>                        
            </a>
            `;
    });
  });
});
