export async function createUser(obj) {
  const response = await fetch("/api/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

export async function saveToDatabase(obj) {
  const response = await fetch("/api/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  return response;
}

export const getDestinations = async () => {
  const response = await fetch("/api/destinations");
  const result = await response.json();
  console.log(result);

  return result;
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
