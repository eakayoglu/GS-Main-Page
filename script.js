// JSON dosyasını çekip verileri HTML'ye aktarma
fetch("data.json")
.then((response) => response.json())
.then((data) => {
    // Profil bilgilerini yerleştirme
    document.getElementById("profileName").textContent =
        data.profile.name;
    document.getElementById("profileNumber").textContent =
        data.profile.number;
    document.getElementById("profileImage").src = data.profile.image;

    // Linkleri kategorilere göre gruplama
    const categories = {};
    data.links.forEach((link) => {
        if (!categories[link.category]) {
            categories[link.category] = [];
        }
        categories[link.category].push(link);
    });

    // Linkleri kategoriler halinde gösterme
    const linksContainer = document.getElementById("linksContainer");
    data.settings.categoryOrder.forEach((category) => {
        if (categories[category]) {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "category";

            const categoryTitle = document.createElement("h3");
            categoryTitle.className = "category-title";
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);

            categories[category].forEach((link) => {
                const anchor = document.createElement("a");
                anchor.href = link.url;
                anchor.textContent = link.name;
                anchor.className = "link";
                anchor.target = "_blank";
                categoryDiv.appendChild(anchor);
            });

            linksContainer.appendChild(categoryDiv);
        }
    });
})
.catch((error) => console.error("JSON verisi yüklenemedi:", error));