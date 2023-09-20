const countryInput = document.querySelector("#country");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link");
const arrivalDateInput = document.querySelector("#arrival-date");
const departureDateInput = document.querySelector("#departure-date");
const imageInput = document.querySelector("#image-upload");
const descriptionInput = document.querySelector("#description");
const saveDestination = document.querySelector("#save-destination");

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
  // TODO: Implement endpoint
  const response = await fetch("/api/getDestinations");
  const destinations = await response.json();
  return destinations;
};

// const destinations = await getDestinations();

// destinations.map((destination) => {
// // TODO
// });

saveDestination.addEventListener("click", addDestination);
