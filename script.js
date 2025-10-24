function showItems(id) {
  document.querySelectorAll('.menu-items').forEach(menu => {
    menu.classList.add('hidden');
  });
  document.getElementById(id).classList.toggle('hidden');
}
