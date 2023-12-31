document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchMaps");
    const mapsContainer = document.getElementById("maps");
  
    // Fungsi untuk memuat data map dari API
    const loadMaps = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/maps");
        if (response.status !== 200) {
          throw new Error("Response error: " + response.status);
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Fungsi untuk menampilkan daftar map
    const displayMaps = (maps) => {
      if (maps.length === 0) {
        // Tampilkan pesan jika data tidak ditemukan
        mapsContainer.innerHTML = `
        <h2 class="text-lg  my-4 text-white-500 font-bold dark:text-gray-400">not found</h2>
        `;
      } else {
      
        // Kosongkan konten mapsContainer
        mapsContainer.innerHTML = "";
        
        maps.forEach((map) => {
          // Tambahkan elemen-elemen hasil pencarian jika ada
          mapsContainer.innerHTML += `
                <a href="./pages/maps.html?id=${map.uuid}" class="p-2 block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                    <img class="mx-auto rounded-md img-fluid" src="${map.splash}">
                    <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${map.displayName}</p>                        
                </a>
              `;
        });
      }
    };
  
    // Fungsi untuk melakukan pencarian map
    const searchMaps = async () => {
      const searchText = searchInput.value.toLowerCase();
      const maps = await loadMaps();
      const filteredMaps = maps.filter((map) =>
        map.displayName.toLowerCase().includes(searchText)
      );
      displayMaps(filteredMaps);
    };
  
    // Memanggil fungsi pencarian saat input berubah
    searchInput.addEventListener("input", searchMaps);
  
    // Memuat dan menampilkan daftar map saat halaman dimuat
    loadMaps().then((maps) => {
      displayMaps(maps);
    });
  });