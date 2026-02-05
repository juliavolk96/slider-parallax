const swiper = new Swiper('.mySwiper', {
  speed: 1200,
  parallax: true,
  loop: true,
  keyboard: {
    enabled: true
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
