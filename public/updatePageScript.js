import { updateDestination } from "./api.js";

const updateBtn = document.querySelector("#updateBtn");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

(async () => {
  const destination = await (await fetch(`/api/destination/${id}`)).json();
  document.querySelector("#country").value = destination.country;
  document.querySelector("#title").value = destination.title;
  document.querySelector("#link").value = destination.link;
  document.querySelector("#arrival-date").value = destination.arrivalDate
    .split("T")[0]
    .replace(/\+/g, "");
  document.querySelector("#departure-date").value = destination.departureDate
    .split("T")[0]
    .replace(/\+/g, "");
  document.querySelector("#description").value = destination.description;
})();

updateBtn.addEventListener("click", () => updateDestination(id));
