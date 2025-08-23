const getEdition = () => {
  const meta = document.querySelector('meta[name="jekyll-edition"]');
  return meta.content;
};

const addBackgroundImageLayers = () => {
  const edition = getEdition();

  if (edition === '13') return;

  const isMobile = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|tablet|mobile/.test(ua);
  };

  if (isMobile()) return;

  const baseUrl = document.querySelector('meta[name="base-url"]')?.content || '';
  let lastNode = null;

  // 12th edition has fewer pictures
  const maxImg = edition === '12' ? 5 : 9;

  for (let i = 2; i <= maxImg; i++) {
    const containers = document.querySelectorAll('.main-bg-container');

    lastNode = containers[containers.length - 1];

    const div = document.createElement('div');
    div.className = 'main-bg-container';
    div.style.backgroundImage = `url('${baseUrl}/img/tla/${i}.webp')`;
    div.style.opacity = '0';
    lastNode.parentNode.insertBefore(div, lastNode.nextSibling);
  }

  // background switcher
  let current = 0;
  const bgContainers = document.querySelectorAll('.main-bg-container');

  setInterval(() => {
    bgContainers[current].style.opacity = '0';
    current = (current + 1) % bgContainers.length;
    bgContainers[current].style.opacity = '1';
  }, 7000);
};


document.addEventListener('DOMContentLoaded', () => {
  // navbar change on scroll
  window.addEventListener('scroll', () => {
    const navHeader = document.getElementById('con-head');
    if (!navHeader) return;
    const top = navHeader.getBoundingClientRect().top + window.scrollY;
    if (top > 50) {
      navHeader.classList.add('head-solid');
    } else {
      navHeader.classList.remove('head-solid');
    }
  });

  // hide menu on navbar click
  const menuContainer = document.getElementById('menu-container');
  const navLinks = document.querySelectorAll('#con-head a, .smooth-scroll');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuContainer) menuContainer.classList.add('mobile-hidden');
    });
  });

  // toggle menu
  const menuButton = document.getElementById('menu-button');
  if (menuButton && menuContainer) {
    menuButton.addEventListener('click', e => {
      e.preventDefault();
      menuContainer.classList.toggle('mobile-hidden');
    });
  }

  addBackgroundImageLayers();
});
