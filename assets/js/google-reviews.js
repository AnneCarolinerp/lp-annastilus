const GOOGLE_PLACE_ID = "ChIJayeGmmBPxwcRxh8A0FYmuCo";

let testimonialIndex = 0;
let testimonialTotal = 0;
let testimonialTimer;

function escapeReviewText(value) {
  const element = document.createElement("div");
  element.textContent = value || "";
  return element.innerHTML;
}

function createInitials(name) {
  return (name || "Cliente")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function createStars(rating) {
  const roundedRating = Math.round(Number(rating) || 0);
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

function showTestimonial(index) {
  const track = document.getElementById("testimonial-track");
  const dots = document.querySelectorAll(".testimonial-dot");

  if (!track || testimonialTotal === 0) return;

  testimonialIndex =
    (index + testimonialTotal) % testimonialTotal;

  track.style.transform =
    `translateX(-${testimonialIndex * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    const active = dotIndex === testimonialIndex;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-current", active ? "true" : "false");
  });
}

function restartTestimonialTimer() {
  window.clearInterval(testimonialTimer);

  if (
    testimonialTotal > 1 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    testimonialTimer = window.setInterval(() => {
      showTestimonial(testimonialIndex + 1);
    }, 6000);
  }
}

async function loadGoogleReviews() {
  const track = document.getElementById("testimonial-track");
  const viewport = document.querySelector(
    ".testimonial-carousel__viewport"
  );
  const dotsContainer = document.getElementById("testimonial-dots");
  const previousButton = document.getElementById(
    "testimonial-previous"
  );
  const nextButton = document.getElementById("testimonial-next");
  const ratingContainer = document.getElementById("google-rating");

  try {
    const { Place } =
      await google.maps.importLibrary("places");

    const place = new Place({
      id: GOOGLE_PLACE_ID,
      requestedLanguage: "pt-BR"
    });

    await place.fetchFields({
      fields: [
        "displayName",
        "rating",
        "userRatingCount",
        "reviews"
      ]
    });

    const reviews = (place.reviews || []).filter(
      (review) => review.text
    );

    if (!reviews.length) {
      throw new Error("Nenhuma avaliação com comentário foi encontrada.");
    }

    testimonialTotal = reviews.length;

    track.innerHTML = reviews
      .map((review) => {
        const author = review.authorAttribution;
        const authorName =
          author?.displayName || "Cliente Google";
        const authorLink =
          author?.uri || "https://share.google/FT8oDtdj3UKkRr6mw";
        const authorPhoto = author?.photoURI;
        const initials = createInitials(authorName);
        const reviewText = review.text || "";
        const reviewRating = review.rating || 5;
        const reviewDate =
          review.relativePublishTimeDescription || "Avaliação do Google";

        const avatar = authorPhoto
          ? `<img
               src="${escapeReviewText(authorPhoto)}"
               alt=""
               loading="lazy"
               referrerpolicy="no-referrer"
             >`
          : escapeReviewText(initials);

        return `
          <article class="testimonial-card">
            <div class="testimonial-card__avatar" aria-hidden="true">
              ${avatar}
            </div>

            <div>
              <p
                class="stars"
                aria-label="Avaliação de ${reviewRating} de 5 estrelas"
              >
                ${createStars(reviewRating)}
              </p>

              <blockquote>
                “${escapeReviewText(reviewText)}”
              </blockquote>

              <p class="testimonial-card__name">
                <a
                  href="${escapeReviewText(authorLink)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeReviewText(authorName)}
                </a>
              </p>

              <p class="testimonial-card__handle">
                ${escapeReviewText(reviewDate)} · Avaliação do Google
              </p>
            </div>
          </article>
        `;
      })
      .join("");

    dotsContainer.innerHTML = reviews
      .map(
        (_, index) => `
          <button
            class="testimonial-dot${index === 0 ? " is-active" : ""}"
            type="button"
            aria-label="Mostrar avaliação ${index + 1}"
            aria-current="${index === 0 ? "true" : "false"}"
            data-testimonial-index="${index}"
          ></button>
        `
      )
      .join("");

    if (place.rating) {
      document.getElementById("google-rating-stars").textContent =
        createStars(place.rating);

      document.getElementById("google-rating-value").textContent =
        Number(place.rating).toFixed(1);

      document.getElementById("google-rating-count").textContent =
        `(${place.userRatingCount || 0} avaliações no Google)`;

      ratingContainer.hidden = false;
    }

    previousButton.hidden = testimonialTotal < 2;
    nextButton.hidden = testimonialTotal < 2;
    dotsContainer.hidden = testimonialTotal < 2;

    previousButton.addEventListener("click", () => {
      showTestimonial(testimonialIndex - 1);
      restartTestimonialTimer();
    });

    nextButton.addEventListener("click", () => {
      showTestimonial(testimonialIndex + 1);
      restartTestimonialTimer();
    });

    dotsContainer.addEventListener("click", (event) => {
      const button = event.target.closest("[data-testimonial-index]");

      if (!button) return;

      showTestimonial(Number(button.dataset.testimonialIndex));
      restartTestimonialTimer();
    });

    const carousel = document.getElementById("testimonial-carousel");

    carousel.addEventListener("mouseenter", () => {
      window.clearInterval(testimonialTimer);
    });

    carousel.addEventListener("mouseleave", () => {
      restartTestimonialTimer();
    });

    carousel.addEventListener("focusin", () => {
      window.clearInterval(testimonialTimer);
    });

    carousel.addEventListener("focusout", () => {
      restartTestimonialTimer();
    });

    viewport.setAttribute("aria-busy", "false");
    showTestimonial(0);
    restartTestimonialTimer();
  } catch (error) {
    console.error("Erro ao carregar avaliações:", error);

    track.innerHTML = `
      <article class="testimonial-card testimonial-card--error">
        <p>
          Não foi possível carregar as avaliações neste momento.
        </p>
      </article>
    `;

    previousButton.hidden = true;
    nextButton.hidden = true;
    dotsContainer.hidden = true;
    viewport.setAttribute("aria-busy", "false");
  }
}

window.loadGoogleReviews = loadGoogleReviews;