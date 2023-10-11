import { saveToDatabase } from "./api.js";
// const countryInput = document.querySelector("#country");
// const titleInput = document.querySelector("#title");
// const linkInput = document.querySelector("#link");
// const arrivalDateInput = document.querySelector("#arrival-date");
// const departureDateInput = document.querySelector("#departure-date");
// const imageInput = document.querySelector("#image-upload");
// const descriptionInput = document.querySelector("#description");

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territories",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const addDestination = async (event) => {
  event.preventDefault();

  const country = document.querySelector("#country").value;
  const title = document.querySelector("#title").value;
  const link = document.querySelector("#link").value;
  const arrivalDate = document.querySelector("#arrival-date").value;
  const departureDate = document.querySelector("#departure-date").value;
  const image = document.querySelector("#image-upload").files[0];
  const description = document.querySelector("#description").value;
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
  const body = await response.json();
  console.log(body);
  if (response.ok) {
    window.location.href = "/";
  } else {
    alert(body.error);
  }
};

export async function updateDestination(id) {
  const imagePath = document.querySelector("#image-upload").value;
  let imageData;

  if (imagePath) {
    imageData = await imageToBase64(
      document.querySelector("#image-upload").files[0]
    );
  } else {
    const response = await (await fetch(`/api/destination/${id}`)).json();
    imageData = response.image;
  }

  const response = await (
    await fetch(`/api/destination/${id}`, {
      // TODO BEARER AUTH
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: document.querySelector("#country").value,
        title: document.querySelector("#title").value,
        link: document.querySelector("#link").value,
        arrivalDate: document.querySelector("#arrival-date").value,
        departureDate: document.querySelector("#departure-date").value,
        image: imageData,
        description: document.querySelector("#description").value,
      }),
    })
  ).json();

  if (response.status === "Successful") {
    window.location.href = "/";
  } else {
    alert("Failed to update...");
  }
}

export async function deleteDestination(id) {
  const response = await (
    await fetch(`/api/destination/${id}`, {
      // TODO BEARER AUTH
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
  ).json();

  if (response.status === "Successful") {
    window.location.href = "/";
  } else {
    alert("Failed to delete...");
  }
}

export const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
