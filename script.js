document.addEventListener("DOMContentLoaded", function () {
  // Detect if we're on a mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia("(max-width: 768px)").matches;

  // Add mobile class to body for CSS targeting
  if (isMobile) {
    document.body.classList.add("mobile");
  }

  // Fix for iOS vh units
  function setVhProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  if (isMobile) {
    setVhProperty();
    window.addEventListener("resize", setVhProperty);
    window.addEventListener("orientationchange", () =>
      setTimeout(setVhProperty, 100)
    );
  }

  // CRITICAL FIX: Force image cards to be visible immediately
  const colorQuotes = {
    // Pink quotes
    "#ff69b4": [
      "Your kindness makes everything around you feel softer and sweeter.",
      "Your gentle heart creates a sanctuary of love wherever you go.",
      "The warmth in your eyes tells stories of compassion and care.",
      "Your nurturing spirit brings healing to those around you.",
      "Like cherry blossoms in spring, your presence brings joy and renewal.",
      "The tenderness in your touch could calm the wildest storms.",
      "Your loving nature wraps around others like a comforting blanket.",
      "You bring sweetness to bitter moments with just your presence.",
    ],

    // White quotes
    "#ffffff": [
      "Your heart is as pure and beautiful as a fresh snowfall.",
      "There's a clarity to your thoughts that cuts through life's chaos.",
      "Your honest words are as refreshing as the morning light.",
      "The purity of your intentions shines through everything you do.",
      "Like moonlight on water, your spirit reflects beauty all around you.",
      "Your presence brings peace, like the first quiet moments after snowfall.",
      "There's a timeless elegance to how you move through life.",
      "You illuminate dark corners with your genuine light.",
    ],

    // Red quotes
    "#dc143c": [
      "Your passion for life and the people you love is simply breathtaking.",
      "The fire in your spirit ignites inspiration in everyone around you.",
      "Your determination burns through obstacles like they're made of paper.",
      "There's a fierce courage in you that refuses to back down from challenges.",
      "The intensity with which you love leaves me in awe every day.",
      "Your vibrant energy transforms ordinary moments into adventures.",
      "Like a flame that refuses to be extinguished, your spirit keeps dancing.",
      "The way you pursue your dreams with such fervor is mesmerizing.",
    ],

    // Yellow quotes
    "#ffd700": [
      "Your smile can brighten even the cloudiest of days.",
      "The joy you radiate is as warm as sunshine after rain.",
      "Your optimism turns shadows into golden opportunities.",
      "There's a light within you that outshines the darkest circumstances.",
      "Your cheerful spirit is like the first daffodil of spring.",
      "The laughter you bring is worth more than all the gold in the world.",
      "Your hopeful outlook transforms challenges into stepping stones.",
      "Like sunlight through leaves, your happiness creates beautiful patterns.",
    ],

    // Brown quotes
    "#8b4513": [
      "Your presence feels like a warm hug that always brings comfort.",
      "The stability you provide is like solid ground beneath uncertain feet.",
      "There's a rootedness to your character that anchors those around you.",
      "Your reliability is as comforting as hot chocolate on a winter evening.",
      "Like ancient trees, your wisdom has grown through seasons of experience.",
      "The warmth of your friendship feels like coming home.",
      "Your steady nature provides shelter when life's storms rage.",
      "The richness of your character adds depth to every conversation.",
    ],

    // Green quotes
    "#50c878": [
      "Your strength to grow and adapt inspires everyone around you.",
      "There's a healing quality to your presence that rejuvenates tired souls.",
      "Like springtime, you bring renewal wherever you go.",
      "Your generosity flows abundantly like leaves reaching toward sunlight.",
      "The way you nurture dreams reminds me of gardens tended with love.",
      "Your calm wisdom is as refreshing as walking through a forest after rain.",
      "Your resilience is like bamboo - flexible yet unbreakable.",
      "The hope you plant in others grows into magnificent possibilities.",
    ],

    // Silver quotes
    "#c0c0c0": [
      "Your grace and wisdom shine brighter than any precious gem.",
      "The elegance with which you handle difficulties is truly remarkable.",
      "Like moonlight on water, your insight creates beautiful reflections.",
      "Your thoughtful perspective brings clarity to complicated situations.",
      "There's a timeless quality to your wisdom that transcends age.",
      "The calm confidence you possess sparkles like stars on still water.",
      "Your adaptability allows you to find the silver lining in any cloud.",
      "The quiet dignity you maintain under pressure is inspiring.",
    ],

    // Black quotes
    "#000000": [
      "Your depth and mystery make you endlessly fascinating.",
      "The complexity of your thoughts creates conversations worth remembering.",
      "Like the night sky, your mind contains infinite possibilities.",
      "Your profound understanding gives weight to your every word.",
      "There's an elegant strength in how you embrace life's contrasts.",
      "The boundaries you maintain show remarkable self-awareness.",
      "Your protective nature creates safe spaces for vulnerability.",
      "The intensity with which you pursue knowledge reveals your brilliance.",
    ],

    // Blue quotes
    "#0000ff": [
      "Your calm and steady heart is a safe place I admire deeply.",
      "The tranquility you bring feels like gazing at an endless horizon.",
      "Like a deep ocean, there's so much more to you than first appears.",
      "Your loyalty runs as deep as ancient rivers carving their path.",
      "There's a peaceful certainty in how you navigate challenges.",
      "The trust you inspire is as vast as the open sky.",
      "Your intuitive wisdom flows like gentle waves toward truth.",
      "The reliability of your friendship is as constant as the tides.",
    ],
  };

  // Get all image cards
  const imageCards = document.querySelectorAll(".image-card");

  // For tracking used quotes per color
  const usedQuotesByColor = {};

  // Initialize tracking object
  Object.keys(colorQuotes).forEach((color) => {
    usedQuotesByColor[color] = [];
  });

  // Function to get a random quote that hasn't been used yet
  function getRandomQuote(color) {
    // If all quotes for this color have been used, reset the tracking
    if (usedQuotesByColor[color].length >= colorQuotes[color].length) {
      usedQuotesByColor[color] = [];
    }

    // Get available quotes (not used yet)
    const availableQuotes = colorQuotes[color].filter(
      (quote) => !usedQuotesByColor[color].includes(quote)
    );

    // Select a random quote
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];

    // Mark as used
    usedQuotesByColor[color].push(selectedQuote);

    return selectedQuote;
  }

  // Apply random quotes to each card
  imageCards.forEach((card) => {
    // Extract color from the style attribute
    const colorStyle = card.getAttribute("style");
    const colorMatch = colorStyle.match(/--color: (#[0-9a-f]{6})/i);

    if (colorMatch && colorMatch[1]) {
      const color = colorMatch[1];
      const overlay = card.querySelector(".overlay");

      // Only change if we have quotes for this color
      if (overlay && colorQuotes[color]) {
        overlay.textContent = getRandomQuote(color);
      }
    }
  });

  // Set timeout to ensure this runs after all other animations
  setTimeout(() => {
    console.log("Forcing all cards to be visible");
    imageCards.forEach((card) => {
      // Remove all animations and transitions
      card.style.transition = "none";
      // Force visibility
      card.style.opacity = "1";
      card.style.transform = "none";
      card.classList.add("revealed");

      // Force all images to be visible
      const img = card.querySelector("img");
      if (img) {
        img.style.transition = "none";
        img.style.opacity = "1";

        // Add native lazy loading for mobile
        if (isMobile && "loading" in HTMLImageElement.prototype) {
          img.loading = "lazy";
        }

        // Add error handling for images
        img.addEventListener("error", function () {
          console.error(`Failed to load image: ${img.src}`);
          img.style.opacity = "1";
          img.src = img.src.replace(/^.*\/images\//, "images/");
        });
      }
    });

    // Re-enable transitions after forcing visibility
    setTimeout(() => {
      imageCards.forEach((card) => {
        card.style.transition = "";
      });
    }, 50);
  }, 100);

  // ----- TYPING EFFECT -----
  const phrases = [
    "Welcome to Adiba's Beautiful World",
    "Every Color Represents Her Soul",
    "Beauty in Every Shade",
    "The Rainbow of Her Personality",
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  const typingSpeed = isMobile ? 70 : 100; // Faster on mobile
  const erasingSpeed = isMobile ? 30 : 50;
  const newPhraseDelay = 2000;
  const typingTextElement = document.getElementById("typing-text");

  if (typingTextElement) {
    let isDeleting = false;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Remove a character
        typingTextElement.innerText = currentPhrase.substring(
          0,
          letterIndex - 1
        );
        letterIndex--;
      } else {
        // Add a character
        typingTextElement.innerText = currentPhrase.substring(
          0,
          letterIndex + 1
        );
        letterIndex++;
      }

      // Speed based on whether we're adding or removing characters
      let typeSpeed = isDeleting ? erasingSpeed : typingSpeed;

      // If complete phrase is typed
      if (!isDeleting && letterIndex === currentPhrase.length) {
        // Pause at end of phrase
        typeSpeed = newPhraseDelay;
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        // Move to next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // ----- FACTS CYCLING -----
  const facts = [
    "Adiba is passionate about coding and fashion!",
    "She loves trying new cuisines from around the world.",
    "Adiba is an extroverted, fun-loving soul!",
    "Her dream is to travel and explore diverse cultures!",
    "Adiba is soon-to-be a CSE Engineer, a brilliant mind in tech!",
  ];

  let factIndex = 0;
  const factElement = document.querySelector(".facts");

  if (factElement) {
    // Cycle through fun facts - longer interval on mobile for easier reading
    const interval = isMobile ? 7000 : 5000;
    setInterval(function () {
      factElement.textContent = facts[factIndex];
      factIndex = (factIndex + 1) % facts.length;
    }, interval);
  }

  // ----- SCROLL EFFECTS AND ANIMATIONS -----
  // Initialize Intersection Observer for scroll-based animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: isMobile ? 0.1 : 0.15, // Lower threshold for mobile
  };

  // Observer for sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: isMobile ? 0.15 : 0.25 }
  );

  // Observe sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Fun tilt effect on mouse move - desktop only
  if (!isMobile) {
    imageCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        const angleY = (e.clientX - cardX) / 10;
        const angleX = ((e.clientY - cardY) / 10) * -1;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      });
    });
  } else {
    // Mobile touch feedback
    imageCards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.classList.add("touch-active");

        // Show overlay on touch
        const overlay = this.querySelector(".overlay");
        if (overlay) {
          overlay.style.transform = "translateY(0)";
        }
      });

      card.addEventListener("touchend", function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 300);
      });
    });
  }

  // Parallax scroll effect on images - desktop only
  if (!isMobile) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;

        // Parallax effect for intro and outro sections
        const introSection = document.querySelector("#intro");
        if (introSection) {
          introSection.style.backgroundPosition = `50% ${scrolled * 0.04}px`;
        }

        const outroSection = document.querySelector("#outro");
        if (outroSection) {
          outroSection.style.backgroundPosition = `50% ${
            -scrolled * 0.04 + 100
          }px`;
        }

        // Add subtle parallax to images
        imageCards.forEach((card) => {
          const cardTop = card.getBoundingClientRect().top;
          const cardImage = card.querySelector("img");
          const speed = 0.08;

          if (cardImage) {
            // Only apply parallax when card is in viewport
            if (cardTop < window.innerHeight && cardTop > -400) {
              cardImage.style.transform = `translateY(${cardTop * speed}px)`;
            }
          }
        });
      },
      { passive: true }
    );
  } else {
    // Disable parallax backgrounds on mobile for performance
    document.querySelectorAll("#intro, #outro").forEach((section) => {
      if (section) section.style.backgroundAttachment = "scroll";
    });
  }

  // ----- UI ELEMENTS -----
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener(
    "scroll",
    () => {
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + "%";
    },
    { passive: true }
  );

  // Add scroll-to-top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");

  // Make button larger on mobile for easier touch
  if (isMobile) {
    scrollTopBtn.style.width = "60px";
    scrollTopBtn.style.height = "60px";
    scrollTopBtn.style.fontSize = "28px";
  }

  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll-to-top button based on scroll position
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ----- CUSTOM CURSOR ----- (desktop only)
  if (!isMobile) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Custom cursor interactions
    document.querySelectorAll("a, button, .image-card").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-grow");
      });

      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-grow");
      });
    });
  } else {
    // Reset cursor for mobile
    document.body.style.cursor = "auto";
  }

  // ----- DECORATIVE EFFECTS -----
  // Add fun confetti effect on page load - fewer on mobile
  createConfetti();

  function createConfetti() {
    const colors = ["#ff6b6b", "#5ce1e6", "#ffde59", "#ff9e7d", "#7bed9f"];
    const confettiCount = isMobile ? 40 : 100; // Fewer on mobile for performance

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      // Random styling
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 5 + 5 + "px";
      confetti.style.opacity = Math.random() + 0.5;

      // Random animation - shorter on mobile
      const duration = isMobile ? Math.random() * 2 + 2 : Math.random() * 3 + 2;
      confetti.style.animationDuration = duration + "s";
      confetti.style.animationDelay = Math.random() * 3 + "s";

      document.body.appendChild(confetti);

      // Remove confetti sooner on mobile
      setTimeout(
        () => {
          confetti.remove();
        },
        isMobile ? 4000 : 7000
      );
    }
  }

  // Theme toggle functionality
  const toggleSwitch = document.querySelector("#checkbox");
  const currentTheme = localStorage.getItem("theme");

  // Check for saved theme preference
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    // Update toggle position
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  } else {
    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
      localStorage.setItem("theme", "dark");
    }
  }

  // Handle toggle switch change
  toggleSwitch.addEventListener("change", switchTheme, false);

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  // Click effects on headings - adapt for touch on mobile
  const headings = document.querySelectorAll("h1, h2");
  const eventType = isMobile ? "touchend" : "click";

  headings.forEach((heading) => {
    heading.addEventListener(eventType, function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";

      // Different positioning for touch vs mouse
      if (isMobile && e.changedTouches) {
        const touch = e.changedTouches[0];
        ripple.style.left = touch.clientX - rect.left - size / 2 + "px";
        ripple.style.top = touch.clientY - rect.top - size / 2 + "px";
      } else {
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      }

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Handle orientation changes on mobile
  if (isMobile) {
    window.addEventListener("orientationchange", function () {
      // After orientation change, reset card visibility
      setTimeout(() => {
        console.log("Orientation changed, resetting card visibility");
        imageCards.forEach((card) => {
          card.style.opacity = "1";
          card.classList.add("revealed");

          const img = card.querySelector("img");
          if (img) img.style.opacity = "1";
        });

        // Reset vh property
        setVhProperty();
      }, 300);
    });

    // Fix issues with iOS overscroll
    document.body.style.overscrollBehaviorY = "none";

    // Fix potential touch issues with overlays
    document.addEventListener(
      "touchmove",
      function (e) {
        const target = e.target;
        // If we're touching an overlay, prevent default scrolling
        if (target.closest(".overlay, .image-card")) {
          if (
            target.closest(".overlay").scrollHeight <=
            target.closest(".overlay").clientHeight
          ) {
            e.preventDefault();
          }
        }
      },
      { passive: false }
    );
  }

  // Final check to ensure images are visible
  window.addEventListener("load", function () {
    console.log("Window load event - final visibility check");
    imageCards.forEach((card) => {
      card.style.opacity = "1";
      card.classList.add("revealed");

      const img = card.querySelector("img");
      if (img) {
        img.style.opacity = "1";
      }
    });

    // Add a class to body indicating everything is loaded
    document.body.classList.add("page-loaded");
  });

  // Secondary check in case window.load event has already fired
  if (document.readyState === "complete") {
    console.log("Document already complete - running final check");
    imageCards.forEach((card) => {
      card.style.opacity = "1";
      card.classList.add("revealed");

      const img = card.querySelector("img");
      if (img) img.style.opacity = "1";
    });

    document.body.classList.add("page-loaded");
  }
});
