export async function createUser(obj) {
  const response = await fetch("/api/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
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

export async function getDestinations() {
  const response = await fetch("/api/destinations");
  const result = await response.json();

  return result;
}

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

  const request = await fetch(`/api/destination/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({
      country: document.querySelector("#country").value,
      title: document.querySelector("#title").value,
      link: document.querySelector("#link").value,
      arrivalDate: document.querySelector("#arrival-date").value,
      departureDate: document.querySelector("#departure-date").value,
      image: imageData,
      description: document.querySelector("#description").value,
    }),
  });
  if (request.status === 401)
    return alert("Failed to update destination - Unauthorized");

  const response = await request.json();

  if (response.status === "Successful") {
    window.location.href = "/";
  } else {
    alert("Failed to update...");
  }
}

export async function deleteDestination(id) {
  if (!confirm("Are you sure you would like to delete this destination?"))
    return;

  const request = await fetch(`/api/destination/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  if (request.status === 401)
    return alert("Failed to delete destination - Unauthorized");

  const response = await request.json();

  if (response.status === "Successful") {
    window.location.href = "/";
  } else {
    alert("Failed to delete...");
  }
}
