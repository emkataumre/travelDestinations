export async function saveToDatabase(obj) {
  const response = await fetch("/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

export const getDestinations = async () => {
  const response = await fetch("/destinations");
  const result = await response.json();
  console.log(result);

  return result;
};
