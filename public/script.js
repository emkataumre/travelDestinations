const logOutBtn = document.querySelector(".logoutBtn");

if (logOutBtn)
  logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    window.location.replace("/");
  });

const token = localStorage.getItem("jwtToken");
document
  .querySelector(token ? "#notLoggedInBtns" : "#loggedInBtns")
  .classList.add("hidden");

document
  .querySelector(token ? "#loggedInBtns" : "#notLoggedInBtns")
  .classList.add("flex");
