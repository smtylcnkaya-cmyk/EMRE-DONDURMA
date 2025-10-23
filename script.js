// menu.js - Erişilebilir ve çok seviyeli menü yönetimi
(function(){
  const menuEl = document.getElementById('cmk-main-menu');
  const hamburger = document.querySelector('.cmk-menu__hamburger');

  // Toggle mobil menü
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const shown = menuEl.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', shown ? 'true' : 'false');
    });
  }

  // Yardımcı: tüm .has-sub öğelerini bul
  const subParents = Array.from(menuEl.querySelectorAll('.has-sub'));

  // Açma / kapama fonksiyonu (animasyon-friendly)
  function openSub(btn, submenu) {
    btn.setAttribute('aria-expanded', 'true');
    submenu.classList.remove('hide');
    submenu.classList.add('show');
  }
  function closeSub(btn, submenu) {
    btn.setAttribute('aria-expanded', 'false');
    // kapatmayı animasyonlu yapmak için hide sınıfı kullanıyoruz
    submenu.classList.remove('show');
    submenu.classList.add('hide');
    // animasyon bitiminde tamamen gizle
    submenu.addEventListener('animationend', function onEnd(){
      if (submenu.classList.contains('hide')) {
        submenu.style.display = ''; // bırakıyoruz CSS kontrol etsin
        submenu.classList.remove('hide');
      }
      submenu.removeEventListener('animationend', onEnd);
    });
  }

  // Her has-sub için buton/alt menü ayarları
  subParents.forEach(parent => {
    const toggle = parent.querySelector('.cmk-menu__link--button, .cmk-submenu__link.cm k-menu__link--button, .cmk-submenu__link');
    // Better: find the direct button inside parent
    const btn = parent.querySelector('button, .cmk-menu__link--button') || parent.querySelector('.cmk-menu__link, .cmk-submenu__link');
    const submenu = parent.querySelector(':scope > .cmk-submenu');
    if (!btn || !submenu) return;

    // click toggles
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeSub(btn, submenu);
      else openSub(btn, submenu);
    });

    // Hover açma/kapama (fare için; dokunmatik cihazlara müdahale etmez)
    parent.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) openSub(btn, submenu);
    });
    parent.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) closeSub(btn, submenu);
    });

    // Klavye kontrolleri: Enter/Space/Arrow keys/Escape
    parent.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'Escape') {
        closeSub(btn, submenu);
        btn.focus();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        // open submenu and focus first item
        openSub(btn, submenu);
        const first = submenu.querySelector('[role="menuitem"]');
        first && first.focus();
      } else if (key === 'ArrowRight') {
        // eğer alt menü varsa aç ve ilk elemanı seç; yoksa sonraki kardeşe geç
        const hasSub = parent.classList.contains('has-sub');
        if (hasSub) {
          openSub(btn, submenu);
          const first = submenu.querySelector('[role="menuitem"]');
          first && first.focus();
        } else {
          // basit next sibling focus
          const next = parent.nextElementSibling;
          if (next) {
            const link = next.querySelector('[role="menuitem"], button');
            link && link.focus();
          }
        }
      } else if (key === 'ArrowLeft') {
        const prev = parent.previousElementSibling;
        if (prev) {
          const link = prev.querySelector('[role="menuitem"], button');
          link && link.focus();
        }
      }
    });
  });

  // Dış tıklama ile kapatma
  document.addEventListener('click', (e) => {
    if (!menuEl.contains(e.target)) {
      subParents.forEach(parent => {
        const btn = parent.querySelector('button, .cmk-menu__link--button');
        const submenu = parent.querySelector(':scope > .cmk-submenu');
        if (btn && submenu && btn.getAttribute('aria-expanded') === 'true') {
          closeSub(btn, submenu);
        }
      });
      if (menuEl.classList.contains('show')) {
        menuEl.classList.remove('show');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Klavyeyle menüde gezinme: Tab doğal bırakılıyor; Home/End desteği
  menuEl.addEventListener('keydown', (e) => {
    const key = e.key;
    const items = Array.from(menuEl.querySelectorAll('[role="menuitem"], button'));
    const current = e.target;
    const idx = items.indexOf(current);
    if (key === 'Home') {
      e.preventDefault();
      items[0] && items[0].focus();
    } else if (key === 'End') {
      e.preventDefault();
      items[items.length - 1] && items[items.length - 1].focus();
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next && next.focus();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev && prev.focus();
    }
  });

})();
