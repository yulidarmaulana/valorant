document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchWapons");
  const waponsContainer = document.getElementById("wapons");

  // Fungsi untuk memuat data wapon dari API
  const loadWapons = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      if (response.status !== 200) {
        throw new Error("Response error: " + response.status);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menampilkan daftar wapon
  const displayWapons = (wapons) => {
    if (wapons.length === 0) {
      // Tampilkan pesan jika data tidak ditemukan
      waponsContainer.innerHTML = `
      <h2 class="text-lg  my-4 text-white-500 font-bold dark:text-gray-400">not found</h2>
      `;
    } else {
      // Kosonngkan konten waponsContainer
      waponsContainer.innerHTML = "";

      wapons.forEach((wapon) => {
        waponsContainer.innerHTML += `
            <a href="./pages/wapons.html?id=${wapon.uuid}" class="p-2 block my-2 rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <img class=" rounded-md" src="${wapon.displayIcon}">
                <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${wapon.displayName}</p>                        
            </a>        
          `;
      });
    }
  };

  // Fungsi untuk melakukan pencarian wapon
  const searchWapons = async () => {
    const searchText = searchInput.value.toLowerCase();
    const wapons = await loadWapons();
    const filteredWapons = wapons.filter((wapon) =>
      wapon.displayName.toLowerCase().includes(searchText)
    );
    if (searchText.length === 0) {
      displayWapons(wapons.slice(0, 20));
    } else {
      displayWapons(filteredWapons);
    }
  };

  // Memanggil fungsi pencarian saat input berubah
  searchInput.addEventListener("input", searchWapons);

  loadWapons().then((wapons) => {
    const limitWapons = wapons.slice(0, 20);

    displayWapons(limitWapons);
  });
});
