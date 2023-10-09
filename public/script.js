const countryInput = document.querySelector("#country");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link");
const arrivalDateInput = document.querySelector("#arrival-date");
const departureDateInput = document.querySelector("#departure-date");
const imageInput = document.querySelector("#image-upload");
const descriptionInput = document.querySelector("#description");

//we need 2 additional functions in order to convert img to sting and the opposite
const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });

const addDestination = async (event) => {
  event.preventDefault();

  const country = countryInput.value;
  const title = titleInput.value;
  const link = linkInput.value;
  const arrivalDate = arrivalDateInput.value;
  const departureDate = departureDateInput.value;
  const image = imageInput.files[0];
  const description = descriptionInput.value;
  const base64 = await imageToBase64(image);
  const obj = {
    country,
    title,
    link,
    arrivalDate,
    departureDate,
    image: base64,
    description,
  };
  const response = await saveToDatabase(obj);
  console.log("obj", obj);
  if (response.ok) {
    const body = await response.json();
    console.log(body);
    console.log("our object:", obj);
    //Append New Elemnts to the first page
    console.log("Successfully appended docs");
  }
};

async function saveToDatabase(obj) {
  const response = await fetch("/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

const getDestinations = async () => {
  const response = await fetch("/destinations");
  const result = await response.json();
  console.log(result);

  return result;
};

if (window.location.pathname === "/") {
  (async () => {
    const destinations = await getDestinations();

    destinations.map((destination) => {
      const section = document.createElement("section");
      section.classList.add("destinationContainer");
      section.innerHTML = `<div
    class="destinationImage"
    style="background-image: url(${destination.image});"
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
