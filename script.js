document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.json")
    .then(res => res.json())
    .then(data => {
      const menuContainer = document.getElementById("menu");
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="price">${item.price}</div>
        `;
        menuContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Menü yüklenemedi:", err));
});
