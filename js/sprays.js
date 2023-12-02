document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchSprays");
  const spraysContainer = document.getElementById("sprays");

  // Fungsi untuk memuat data sprays dari API
  const loadSprays = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/sprays");
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
  const displaySprays = (sprays) => {

    if (sprays.length === 0) {
      // Tampilkan pesan jika data tidak ditemukan
      spraysContainer.innerHTML = `
      <h2 class="text-lg  my-4 text-white-500 font-bold dark:text-gray-400">not found</h2>
      `;
    } else {
      spraysContainer.innerHTML = "";
      
      sprays.forEach((spray) => {
        if (spray.fullTransparentIcon != null) { // filter untuk memastikan tidak memilikik data yang bernilai null
          spraysContainer.innerHTML += `
                  <a href="#" class="p-2 mb-4 block max-w-sm rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                      <img class="rounded-md my-2 img-fluid" src="${spray.fullTransparentIcon}">
                      <p class="text-sm text-white-500 font-semibold dark:text-gray-400">${spray.displayName}</p>                        
                  </a>
                `;
        }
      });
    }
  };

  // Fungsi untuk melakukan pencarian spray
  
  const searchSprays = async () => {
    const searchText = searchInput.value.toLowerCase();
    const sprays = await loadSprays();
    const filteredSprays = sprays.filter((spray) =>
      spray.displayName.toLowerCase().includes(searchText)
    );

    const randomSprays = [];
    
    for (let i = 0; i < 16; i++) {
      randomSprays.push(sprays[Math.round(Math.random() * (sprays.length))]);
    } 

    if (searchText.length === 0) {
        // displaySprays(sprays.slice(0, 16));
        displaySprays(randomSprays);
      } else {
        displaySprays(filteredSprays);
      }
  };

  // Memanggil fungsi pencarian saat input berubah
  searchInput.addEventListener("input", searchSprays);

  // Memuat dan menampilkan daftar agen saat halaman dimuat
  loadSprays().then((sprays) => {
    const limitSprays = [];

    for (let i = 0; i < 16; i++) {
      limitSprays.push(sprays[Math.round(Math.random() * (sprays.length))]);
    } 

    displaySprays(limitSprays);
  });
});
