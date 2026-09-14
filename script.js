const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");

const count = document.getElementById("count");
const baseTotal = document.getElementById("baseTotal");
const discountPercent = document.getElementById("discountPercent");
const discountAmount = document.getElementById("discountAmount");
const total = document.getElementById("total");
const discountMessage = document.getElementById("discountMessage");
const bookingMessage = document.getElementById("bookingMessage");

const movieSelect = document.getElementById("movie");
const categorySelect = document.getElementById("category");
const movieSearch = document.getElementById("movieSearch");
const themeToggle = document.getElementById("themeToggle");
const bookBtn = document.getElementById("bookBtn");

let ticketPrice = Number(movieSelect.value);

/*
  Feature 1:
  Bulk discount
  1-2 tickets  -> 0%
  3-4 tickets  -> 5%
  5+ tickets   -> 10%
*/
function getDiscountRate(ticketCount) {
  if (ticketCount >= 5) return 0.10;
  if (ticketCount >= 3) return 0.05;
  return 0;
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const basePrice = selectedSeatsCount * ticketPrice;
  const rate = getDiscountRate(selectedSeatsCount);
  const discount = basePrice * rate;
  const finalPrice = basePrice - discount;

  count.textContent = selectedSeatsCount;
  baseTotal.textContent = basePrice.toFixed(2);
  discountPercent.textContent = (rate * 100).toFixed(0);
  discountAmount.textContent = discount.toFixed(2);
  total.textContent = finalPrice.toFixed(2);

  if (selectedSeatsCount >= 5) {
    discountMessage.textContent = "🎉 10% bulk booking discount applied!";
  } else if (selectedSeatsCount >= 3) {
    discountMessage.textContent = "🎉 5% group booking discount applied!";
  } else {
    discountMessage.textContent = "Select 3 or more seats to receive a discount.";
  }

  saveBookingData();
}

function saveBookingData() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const indexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(indexes));
  localStorage.setItem("selectedMovieIndex", movieSelect.selectedIndex);
  localStorage.setItem("selectedMoviePrice", movieSelect.value);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (Array.isArray(selectedSeats)) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = Number(selectedMovieIndex);
    ticketPrice = Number(movieSelect.value);
  }
}

movieSelect.addEventListener("change", () => {
  ticketPrice = Number(movieSelect.value);
  updateSelectedCount();
});

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("sold")
  ) {
    event.target.classList.toggle("selected");
    bookingMessage.textContent = "";
    updateSelectedCount();
  }
});

/*
  Feature 2:
  Movie category filter + search
*/
function filterMovies() {
  const category = categorySelect.value;
  const search = movieSearch.value.trim().toLowerCase();

  [...movieSelect.options].forEach(option => {
    const optionCategory = option.dataset.category;
    const movieName = option.textContent.toLowerCase();

    const categoryMatch =
      category === "All" || optionCategory === category;

    const searchMatch = movieName.includes(search);

    option.hidden = !(categoryMatch && searchMatch);
  });

  const currentOption = movieSelect.options[movieSelect.selectedIndex];

  if (currentOption && currentOption.hidden) {
    const firstVisible = [...movieSelect.options].find(option => !option.hidden);

    if (firstVisible) {
      movieSelect.value = firstVisible.value;
      ticketPrice = Number(firstVisible.value);
      updateSelectedCount();
    }
  }
}

categorySelect.addEventListener("change", filterMovies);
movieSearch.addEventListener("input", filterMovies);

/*
  Feature 3:
  Dark/light mode
*/
function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeToggle.textContent =
    theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";

  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light")
    ? "dark"
    : "light";

  applyTheme(newTheme);
});

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

/*
  Booking confirmation
*/
bookBtn.addEventListener("click", () => {
  const selectedCount = document.querySelectorAll(".row .seat.selected").length;

  if (selectedCount === 0) {
    bookingMessage.textContent = "⚠️ Please select at least one seat.";
    return;
  }

  const movieName =
    movieSelect.options[movieSelect.selectedIndex].textContent;

  bookingMessage.textContent =
    `✅ Booking successful! ${selectedCount} seat(s) booked for ${movieName}. Final amount: ₹${total.textContent}`;

  localStorage.removeItem("selectedSeats");

  document.querySelectorAll(".row .seat.selected").forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("sold");
  });

  updateSelectedCount();
});

populateUI();
updateSelectedCount();
