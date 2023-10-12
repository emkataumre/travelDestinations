import { saveToDatabase } from "./api.js";

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
  if (response.ok) {
    window.location.href = "/";
  } else {
    alert(body.error);
  }
};

export const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
