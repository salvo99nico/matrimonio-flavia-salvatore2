const openButton = document.getElementById("openButton");

if (openButton) {
  openButton.addEventListener("click", () => {
    const detailsSection = document.getElementById("details");

    if (detailsSection) {
      detailsSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}

const weddingDate = new Date("2027-06-19T15:30:00+02:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  if (diff <= 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";
    return;
  }

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = seconds % 60;

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = secs;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

document.querySelectorAll(".reveal, .reveal-start").forEach((element) => {
  observer.observe(element);
});

setTimeout(() => {
  document.querySelectorAll(".reveal-start").forEach((element) => {
    element.classList.add("visible");
  });
}, 150);

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const guests = document.getElementById("guests").value.trim();
    const notes = document.getElementById("notes").value.trim();

    const textMessage =
      `Ciao Flavia e Salvatore, confermo la mia presenza al matrimonio del 19 giugno 2027.\n\n` +
      `Nome: ${name}\n` +
      `Partecipanti: ${guests}\n` +
      `Note: ${notes || "Nessuna"}`;

    const salvatorePhone = "393924914903";
    const whatsappUrl =
      `https://wa.me/${salvatorePhone}?text=${encodeURIComponent(textMessage)}`;

    window.open(whatsappUrl, "_blank");
  });
}