import { getDestinations } from "./api.js";
import { deleteDestination } from "./utils.js";

(async () => {
  const destinations = await getDestinations();

  destinations.map((destination) => {
    const section = document.createElement("section");
    section.classList.add("destinationContainer");
    section.innerHTML = `
    <div class="destinationImage" style="background-image: url(${
      destination.image
    });"></div>
    <div class="destinationInformation">
      <a href="/update?id=${destination._id}">
      <div class="destinationAdminButtons">
        <button>Update</button></a>
        <button class="deleteBtn">Delete</button>
      </div>
      <h6 class="destinationLocationContainer">
      <div class="destinationLocationName">
        <img src="img/icon_location.svg" alt="Location" class="destinationLocationPin" />
        ${destination.country.toUpperCase()}
      </div>
      <a class="destinationLocationLink" target="_blank" href="${
        destination.link
      }">View on Google Maps</a>
    </h6>
    <div class="destinationInformationText">
      <h2>${destination.title}</h2>
      <h6>
        <b>${destination.arrivalDate} - ${destination.departureDate}</b><br />
        ${destination.description}
      </h6>
    </div>`;

    document.querySelector("#template").appendChild(section);

    const deleteBtn = section.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () =>
      deleteDestination(destination._id)
    );
  });
})();
