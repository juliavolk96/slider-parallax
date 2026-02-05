const swiper = new Swiper('.mySwiper', {
  speed: 1400,
  parallax: true,
  loop: true,
  keyboard: {
    enabled: true
  },
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

async function fetchRatings() {
  const slides = document.querySelectorAll('.swiper-slide[data-anime-id]');

  for (const slide of slides) {
    const animeId = slide.dataset.animeId;
    const scoreElement = slide.querySelector('.score');

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const result = await response.json();

      if (result.data && result.data.score) {
        scoreElement.textContent = result.data.score;
        scoreElement.style.opacity = "1";
      } else {
        scoreElement.textContent = "N/A";
        scoreElement.style.opacity = "1";
      }
    } catch (error) {
      console.error("Error fetching MAL score:", error);
      scoreElement.textContent = "Err";
      scoreElement.style.opacity = "1";
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

window.addEventListener('load', fetchRatings);
