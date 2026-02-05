const initAnimeExperience = () => {
  const swiper = new Swiper('.mySwiper', {
    speed: 1400,
    parallax: true,
    loop: true,
    grabCursor: true,
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

  const fetchAnimeRatings = async () => {
    const slides = document.querySelectorAll('.swiper-slide[data-anime-id]');

    const fetchPromises = Array.from(slides).map(async (slide, index) => {
      const animeId = slide.dataset.animeId;
      const scoreElement = slide.querySelector('.score');

      try {
        await new Promise(resolve => setTimeout(resolve, index * 800));

        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const { data } = await response.json();

        if (data && data.score) {
          scoreElement.textContent = data.score.toFixed(2);
          scoreElement.style.opacity = "1";
        } else {
          scoreElement.textContent = "N/A";
          scoreElement.style.opacity = "0.7";
        }
      } catch (error) {
        console.warn(`Failed to fetch rating for ID ${animeId}:`, error);
        scoreElement.textContent = "—";
        scoreElement.style.opacity = "0.5";
      }
    });

    await Promise.all(fetchPromises);
  };

  fetchAnimeRatings();
};

document.addEventListener('DOMContentLoaded', initAnimeExperience);
