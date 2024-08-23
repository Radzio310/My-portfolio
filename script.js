function openSection(sectionName, element, color) {
  var i, tabcontent, tablinks;

  // Ukryj wszystkie elementy tabcontent
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Usuń kolor tła wszystkich przycisków tablink
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Pokaż wybraną sekcję tabcontent
  document.getElementById(sectionName).style.display = "block";

  // Zmień kolor tła aktywnego przycisku tablink
  element.style.backgroundColor = color;
}

/* ----------------------------------------- CV ----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".typewriter-text");
  const text = textElement.textContent;
  textElement.textContent = "";

  let index = 0;

  function type() {
    if (index < text.length) {
      textElement.textContent += text[index];
      index++;
      setTimeout(type, 25); // Adjust typing speed here
    }
  }

  type();
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  const sections = document.querySelectorAll(".cv-section");
  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");

  function checkVisibility() {
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        item.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Trigger the function once on load
});

// Uruchom sekcję domyślną
document.getElementById("defaultOpen").click();

document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".cv-section");

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible =
      (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
      (rect.top < window.innerHeight && rect.bottom >= 0);

    if (isVisible) {
      section.classList.add("visible");
    }
  });
});

// Funkcja do resetowania animacji dla sekcji CV
function resetAnimations() {
  const sections = document.querySelectorAll(".cv-section");
  const softSkillItems = document.querySelectorAll(".soft-skills-list li");
  const languages = document.querySelectorAll(".circular-progress");

  // Resetowanie sekcji CV
  sections.forEach((section) => {
    section.classList.remove("visible");

    // Resetowanie umiejętności w każdej sekcji
    const skills = section.querySelectorAll(".skill");
    skills.forEach((skill) => {
      skill.classList.remove("visible");
    });
  });

  // Resetowanie umiejętności miękkich
  softSkillItems.forEach((item) => {
    item.classList.remove("visible");
  });

  // Resetowanie języków obcych
  languages.forEach((language) => {
    const circle = language.querySelector("svg circle:nth-child(2)");
    const valueElement = language.querySelector(".progress-value_number");

    // Przywróć początkowy stan okręgu
    circle.style.strokeDashoffset = 502.4; // Ukrycie całego okręgu (pełna długość dasharray)

    // Ukryj wartość procentową
    valueElement.style.visibility = "hidden";
  });
}

// Funkcja do otwierania sekcji
function openSection(sectionName, element, color) {
  const tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach((content) => {
    content.style.display = "none"; // Ukryj wszystkie zakładki
  });

  const tablinks = document.querySelectorAll(".tablink");
  tablinks.forEach((link) => {
    link.style.backgroundColor = ""; // Resetuj kolor wszystkich zakładek
  });

  document.getElementById(sectionName).style.display = "block"; // Pokaż aktywną zakładkę
  element.style.backgroundColor = color; // Ustaw kolor zakładki

  // Jeśli otwieramy zakładkę CV, zresetuj animacje
  if (sectionName === "cv") {
    resetAnimations();
  }
}

// Uruchom sekcję domyślną
document.getElementById("defaultOpen").click();

// Funkcja do uruchamiania animacji przy przewijaniu
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".cv-section");
  const softSkillsList = document.querySelector(".soft-skills-list");
  const softSkillItems = softSkillsList.querySelectorAll("li");

  sections.forEach((section, sectionIndex) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      setTimeout(() => {
        section.classList.add("visible");

        // Animacja dla umiejętności
        const skills = section.querySelectorAll(".skill");
        skills.forEach((skill, skillIndex) => {
          setTimeout(() => {
            skill.classList.add("visible");
          }, skillIndex * 500);
        });

        // Animacja dla języków obcych
        const languages = section.querySelectorAll(".circular-progress");
        languages.forEach((language, langIndex) => {
          const valueElement = language.querySelector(".progress-value_number");
          const value = parseInt(valueElement.textContent.trim());
          const circle = language.querySelector("svg circle:nth-child(2)");

          const circumference = 2 * Math.PI * 80; // 80 to promień w SVG
          const offset = circumference - (circumference * value) / 100;

          circle.style.strokeDasharray = `${circumference}`;
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, langIndex * 500);
        });
      }, sectionIndex * 300);
    }
  });

  const softSkillsListRect = softSkillsList.getBoundingClientRect();
  const isSoftSkillsListVisible =
    softSkillsListRect.top < window.innerHeight &&
    softSkillsListRect.bottom > 0;

  if (isSoftSkillsListVisible) {
    softSkillItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 500);
    });
  }

  // Animacja dla certyfikatów
  const certificates = section.querySelectorAll(".certificate-card");
  certificates.forEach((certificate, certIndex) => {
    setTimeout(() => {
      certificate.style.opacity = 1;
      certificate.style.transform = "rotateY(0)";
    }, certIndex * 300);
  });
});

// Resetowanie animacji przy przełączaniu zakładek
document.querySelectorAll(".tablink").forEach((tab) => {
  tab.addEventListener("click", function () {
    resetAnimations();
  });
});

/* ----------------------------------------- Projekty ----------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  const modals = document.querySelectorAll(".project-modal");
  const closeButtons = document.querySelectorAll(".close");

  // Funkcja do wyświetlenia kart projektów z animacją
  function showProjectCards() {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("active");
      }, index * 300); // 300ms opóźnienia dla każdego projektu
    });
  }

  // Funkcja do ukrycia kart projektów (resetowanie animacji)
  function hideProjectCards() {
    projectCards.forEach((card) => {
      card.classList.remove("active");
    });
  }

  // Dodajemy nasłuchiwanie na kliknięcie w zakładkę projekty, aby uruchomić animację
  const projectsTab = document.getElementById("projects-header"); // ID elementu zakładki "Projekty"
  const allTabs = document.querySelectorAll(".tablinks"); // Pobieramy wszystkie zakładki

  if (projectsTab) {
    projectsTab.addEventListener("click", function () {
      const target = document.getElementById("projects");
      if (target) {
        // Najpierw ukrywamy karty, aby zresetować animację
        hideProjectCards();

        // Następnie pokazujemy karty z opóźnieniem, aby zresetowana animacja miała czas na uruchomienie
        setTimeout(showProjectCards, 300); // 300ms opóźnienia przed ponownym uruchomieniem animacji
      }
    });
  }

  // Ukrywanie kart przy zmianie zakładki na inną
  allTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      if (this !== projectsTab) {
        hideProjectCards();
      }
    });
  });

  // Dodanie obsługi kliknięcia na kartę projektu, aby otworzyć modal
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      document.getElementById("modal-project-" + projectId).style.display =
        "block";
    });
  });

  // Dodanie obsługi zamknięcia modalu po kliknięciu w przycisk zamknięcia
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    });
  });

  // Dodanie obsługi zamknięcia modalu po kliknięciu poza modal
  window.onclick = function (event) {
    if (event.target.classList.contains("project-modal")) {
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    }
  };
});

/* ----------------------------------------- O mnie ----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const aboutTab = document.getElementById("about-header"); // ID zakładki "O mnie poza pracą"
  const aboutSection = document.getElementById("about");
  const hobbyCards = document.querySelectorAll(".hobby-card");

  function showHobbyCards() {
    hobbyCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("active");
      }, index * 300); // 300ms opóźnienia dla każdej karty
    });
  }

  function resetHobbyCards() {
    hobbyCards.forEach((card) => {
      card.classList.remove("active", "clicked"); // Usunięcie klasy 'active' i 'clicked', aby zresetować animację
    });
  }

  if (aboutTab) {
    aboutTab.addEventListener("click", function () {
      resetHobbyCards(); // Zresetuj karty, zanim ponownie pokażesz animację
      if (aboutSection) {
        aboutSection.classList.add("active");
        setTimeout(showHobbyCards, 100); // Odczekaj chwilę, zanim uruchomisz animację na nowo
      }
    });
  }

  hobbyCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Ukryj opis we wszystkich kartach
      hobbyCards.forEach((c) => c.classList.remove("clicked"));

      // Dodaj klasę 'clicked' tylko do klikniętej karty, aby wyświetlić opis
      this.classList.add("clicked");
    });
  });

  // Nasłuchiwanie na zmianę zakładek
  const allTabs = document.querySelectorAll(".tablinks");
  allTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Jeżeli użytkownik przełącza zakładkę, zresetuj animację sekcji "O mnie poza pracą"
      if (this !== aboutTab && aboutSection) {
        aboutSection.classList.remove("active");
        resetHobbyCards();
      }
    });
  });
});

/* ----------------------------------------- Kontakt ----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const contactTab = document.getElementById("contact-header"); // Zakładka Kontakt
  const contactSection = document.getElementById("contact");
  const contactItems = document.querySelectorAll(".contact-item");

  function showContactItems() {
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("active");
      }, index * 200); // 200ms opóźnienia dla każdego elementu
    });
  }

  function resetContactItems() {
    contactItems.forEach((item) => {
      item.classList.remove("active");
    });
  }

  if (contactTab) {
    contactTab.addEventListener("click", function () {
      resetContactItems();
      if (contactSection) {
        contactSection.classList.add("active");
        setTimeout(showContactItems, 100);
      }
    });
  }

  const allTabs = document.querySelectorAll(".tablinks");
  allTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      if (this !== contactTab && contactSection) {
        contactSection.classList.remove("active");
        resetContactItems();
      }
    });
  });
});
