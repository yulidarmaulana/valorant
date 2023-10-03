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


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchCards");
  const cardsContainer = document.getElementById("cards");

  // Fungsi untuk memuat data player card dari API
  const loadCards = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/playercards");
      if (response.status !== 200) {
        throw new Error("Response error: " + response.status);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menampilkan daftar player card
  const displayCards = (cards) => {
    cardsContainer.innerHTML = "";
    cards.forEach((card) => {
      cardsContainer.innerHTML += `
              <a href="#" class="block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <img class="mx-auto rounded-md p-2" src="${card.largeArt}">
                  <img class="mx-auto p-2 rounded-md shadow-md" src="${card.wideArt}">
                  <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${card.displayName}</p>                        
              </a>
            `;
    });
  };

  const searchCards = async () => {
    const searchText = searchInput.value.toLowerCase();
    const cards = await loadCards();
    const filteredCards = cards.filter((card) =>
      card.displayName.toLowerCase().includes(searchText)
    );
    if (searchText.length === 0) {
      // console.log(searchText, "kosong");
      displayCards(cards.slice(0, 10));
    } else {
      displayCards(filteredCards);
    }
  }

  // Memanggil fungsi pencarian saat input berubah
  searchInput.addEventListener("input", searchCards);

  // memuat dan menampilkan daftar player card saat halaman dimuat
  loadCards().then((cards) => {

    const limitCards = cards.slice(0, 10);

    displayCards(limitCards);
  });
})


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
            <a href="#" class="p-2 block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <img class="mx-auto rounded-md " src="${maps.splash}">
                <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${maps.displayName}</p>                        
            </a>
            `;
    });
  });
});
