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
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

export const getDestinations = async () => {
  const response = await fetch("/api/destinations");
  const result = await response.json();
  console.log(result);

  return result;
};
