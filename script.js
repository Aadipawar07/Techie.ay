//Time Display at bottom

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navlinks");

  // Toggle menu on click
  hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
      if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
          navLinks.classList.remove("active");
      }
  });
});

function updateTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are zero-based
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Add leading zero
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  const formattedTime = `${day} / ${month} / ${year} ${formattedHours}:${minutes} ${ampm}`;

  document.getElementById("current-time").textContent = formattedTime;
}

// Call updateTime once on page load
updateTime();

// Optionally, update time every second if needed
setInterval(updateTime, 1000);


//Dark mode

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("toggle-theme");
  const body = document.body;

  // Check Local Storage for Theme Preference
  if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️ Light Mode";
  }

  themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
          themeToggle.textContent = "☀️ Light Mode";
      } else {
          localStorage.setItem("darkMode", "disabled");
          themeToggle.textContent = "🌙 Dark Mode";
      }
  });
});

//card reaction

document.addEventListener("DOMContentLoaded", function () {
  const upvoteButtons = document.querySelectorAll(".upvote");

  // Load previous votes from localStorage
  const votes = JSON.parse(localStorage.getItem("upvotes")) || {};

  function updateVote(button) {
      let card = button.closest(".resource-card");
      let cardId = card.dataset.resourceId;
      let countSpan = button.querySelector("span");

      // If no vote data exists for this card, initialize it
      if (!votes[cardId]) {
          votes[cardId] = { upvotes: 0, voted: false };
      }

      // Allow voting only once per card
      if (!votes[cardId].voted) {
          votes[cardId].upvotes += 1;
          votes[cardId].voted = true;

          // Save to localStorage
          localStorage.setItem("upvotes", JSON.stringify(votes));

          // Update UI
          countSpan.textContent = votes[cardId].upvotes;
          button.classList.add("active");
      }
  }

  function loadVotes() {
      upvoteButtons.forEach(button => {
          let card = button.closest(".resource-card");
          let cardId = card.dataset.resourceId;
          let countSpan = button.querySelector("span");

          if (votes[cardId]) {
              countSpan.textContent = votes[cardId].upvotes;
              if (votes[cardId].voted) {
                  button.classList.add("active");
              }
          }
      });
  }

  upvoteButtons.forEach(button => {
      button.addEventListener("click", function () {
          updateVote(this);
      });
  });

  loadVotes();
});

