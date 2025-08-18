const isMobile = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|tablet|mobile/.test(ua);
};

const cycleBackgroundImages = () => {
  const bgContainers = document.querySelectorAll('.main-bg-container');
  if (!bgContainers.length) return;
  let current = 0;
  bgContainers.forEach((container, i) => {
    container.style.opacity = i === 0 ? '1' : '0';
    container.style.zIndex = i === 0 ? '20' : '10';
  });
  setInterval(() => {
    bgContainers[current].style.opacity = '0';
    bgContainers[current].style.zIndex = '10';
    current = (current + 1) % bgContainers.length;
    bgContainers[current].style.opacity = '1';
    bgContainers[current].style.zIndex = '20';
  }, 7000);
};

const addBackgroundImageLayers = () => {
  if (!isMobile()) {
    const baseUrl = document.querySelector('meta[name="base-url"]')?.content || '';
    let lastNode = null;
    for (let i = 2; i <= 9; i++) {
      const containers = document.querySelectorAll('.main-bg-container');
      lastNode = containers[containers.length - 1];
      const div = document.createElement('div');
      div.className = 'main-bg-container';
      div.style.backgroundImage = `url('${baseUrl}/img/tla/${i}.webp')`;
      lastNode.parentNode.insertBefore(div, lastNode.nextSibling);
    }
    cycleBackgroundImages();
  }
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
