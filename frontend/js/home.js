window.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero Animations
  gsap.from(".hero-content h1", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".reveal-sub", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });

  gsap.from(".explore-btn", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });

  // Typing Text Animation
  const textElement = document.querySelector(".type-text");
  const phrases = [
    "Delicious, handcrafted cakes made with love 💖",
    "Fresh ingredients. Perfect flavors 🎂",
    "Every bite is a celebration 🎉",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const currentText = currentPhrase.substring(0, charIndex);

    textElement.textContent = currentText;

    if (!isDeleting) {
      charIndex++;
      delay = 80;
      if (charIndex === currentPhrase.length + 1) {
        delay = 2000;
        isDeleting = true;
      }
    } else {
      charIndex--;
      delay = 40;
      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 200;
      }
    }

    setTimeout(type, delay);
  }

  type();

  // Cake Cards Animation
  gsap.utils.toArray(".cake-card").forEach((card, i) => {
    const anim = gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 80,
        rotateZ: i % 2 === 0 ? -4 : 4,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        paused: true,
      }
    );

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      end: "bottom 10%",
      onEnter: () => anim.play(),
      onLeave: () => anim.reverse(),
      onEnterBack: () => anim.play(),
      onLeaveBack: () => anim.reverse(),
    });
  });

  // Cake Info (Title + Price) Animation
  gsap.utils.toArray(".cake-info").forEach((info) => {
    gsap.from(info, {
      scrollTrigger: {
        trigger: info,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  // Extra Text Reveal (if any .reveal-text)
  gsap.utils.toArray(".reveal-text").forEach((text, i) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out",
    });
  });
});
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cake-card");

  cards.forEach((card) => {
    const cakeInfo = card.querySelector(".cake-info");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Animate the entire card (slide up + fade in)
    tl.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate the text inside .cake-info (h3 + p)
    if (cakeInfo) {
      tl.from(cakeInfo.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.5");
    }
  });
});

gsap.utils.toArray('.story-text-block').forEach((textBlock, i) => {
  gsap.from(textBlock, {
    scrollTrigger: {
      trigger: textBlock,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: i * 0.2
  });
});

gsap.utils.toArray('.story-image').forEach((image, i) => {
  gsap.from(image, {
    scrollTrigger: {
      trigger: image,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: i * 0.2
  });
});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".story-block").forEach((block) => {
  gsap.fromTo(
    block,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: block,
        start: "top 85%",
        end: "bottom 0%",
        toggleActions: "play none none reverse", // <- KEY CHANGE
      }
    }
  );
});

gsap.from(".story-heading", {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".story-heading",
    start: "top 85%",
    toggleActions: "play none none none",
  }
});
gsap.registerPlugin(ScrollTrigger);

gsap.from(".reveal-footer", {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    toggleActions: "play none none none",
  }
});
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
        markers: false, // ✅ set to true for debugging
      }
    }
  );
});

// Ye code aap home.js ya account.js ke end me dalein


