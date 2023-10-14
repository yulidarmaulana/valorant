document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchBundles");
  const bundlesContainer = document.getElementById("bundles");

  // Fungsi untuk memuat data bundles dari API
  const loadBundles = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/bundles");
      if (response.status !== 200) {
        throw new Error("Response error: " + response.status);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menampilkan daftar bundles
  const displayBundles = (bundles) => {
    if (bundles.length === 0) {
      // Tampilkan pesan jika data tidak ditemukan
      bundlesContainer.innerHTML = `
      <h2 class="text-lg  my-4 text-white-500 font-bold dark:text-gray-400">not found</h2>
      `;
    } else {
      bundlesContainer.innerHTML = "";
      
      bundles.forEach((bundle) => {
        bundlesContainer.innerHTML += `
            <a href="./pages/bundles.html?id=${bundle.uuid}" class="p-2 block my-2 rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <img class=" rounded-md" src="${bundle.displayIcon}">
                <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${bundle.displayName}</p>                        
            </a>        
          `;
      });
    }    
  };

  // Fungsi untuk melakukan pencarian bundles
  const searchBundles = async () => {
    const searchText = searchInput.value.toLowerCase();
    const bundles = await loadBundles();
    const filteredBundles = bundles.filter((bundle) =>
      bundle.displayName.toLowerCase().includes(searchText)
    );
    if (searchText.length === 0) {
        displayBundles(bundles.slice(0, 10));
      } else {
        displayBundles(filteredBundles);
      }
  };

  // Memanggil fungsi pencarian saat input berubah
  searchInput.addEventListener("input", searchBundles);

  loadBundles().then((bundles) => {
    const limitBundles = bundles.slice(0, 10);

    displayBundles(limitBundles);
  });
});
