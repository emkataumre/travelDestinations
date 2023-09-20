const countryInput = document.querySelector("#country");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link");
const arrivalDateInput = document.querySelector("#arrival-date");
const departureDateInput = document.querySelector("#departure-date");
const imageInput = document.querySelector("#image-upload");
const descriptionInput = document.querySelector("#description");

const addDestination = async (event) => {
  event.preventDefault();

  const country = countryInput.value;
  const title = titleInput.value;
  const link = linkInput.value;
  const arrivalDate = arrivalDateInput.value;
  const departureDate = departureDateInput.value;
  const image = imageInput.value;
  const description = descriptionInput.value;

  const obj = {
    country,
    title,
    link,
    arrivalDate,
    departureDate,
    image,
    description,
  };

  const response = await saveToDatabase(obj);

  if (response.ok) {
    const body = await response.json();
    console.log(body);
    //Append New Elemnts to the first page
    console.log("Successfully appended docs");
  }
};

async function saveToDatabase(obj) {
  const response = await fetch("api/addDestination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

const getDestinations = async () => {
  const response = await fetch("/api/getDestinations");
  const destinations = await response.json();
  console.log(destinations);
  return destinations.destinations;
};

if (window.location.pathname === "/") {
  (async () => {
    const destinations = await getDestinations();

    destinations.map((destination) => {
      const section = document.createElement("section");
      section.classList.add("destinationContainer");
      section.innerHTML = `<div
    class="destinationImage"
    style="background-image: url('img/japan.avif');"
    ></div>
  <div class="destinationInformation">
  <h6 class="destinationLocationContainer">
    <div class="destinationLocationName">
      <img
        src="img/icon_location.svg"
        alt="Location"
        class="destinationLocationPin"
        />
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
    });
  })();
}
