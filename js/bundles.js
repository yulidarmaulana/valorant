document.addEventListener("DOMContentLoaded", () => {
  const searchBundles = document.getElementById("searchBundles");
  const bundlesContainer = document.getElementById("bundles");

  // Fungsi untuk memuat data agen dari API
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
    bundlesContainer.innerHTML = "";
    bundles.forEach((bundle) => {
      bundlesContainer.innerHTML += `
        <a href="#" class="p-2 block my-2 rounded-lg shadow-md hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
            <img class="mx-auto rounded-md" src="${bundle.displayIcon}">
            <p class="text-sm my-4 text-white-500 font-semibold dark:text-gray-400">${bundle.displayName}</p>                        
        </a>        
        `;
    });
  };

  loadBundles().then((bundles) => {
    const limitBundles = bundles.slice(0, 10);
    displayBundles(limitBundles);
  });
});
