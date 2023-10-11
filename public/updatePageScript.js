const id = window.location.href.split("/")[4].split("/")[0];
(async () => {
  //   const destination = await fetch(`/api/destination/${id}`, {
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const response = destination.json();
  //   console.log(response);
})();

async function updateDestination(destination) {
  const response = await fetch(`/api/destination/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(destination),
  });
  console.log(response);
  document.querySelector("form").reset();

  return response;
}

// async function createUser(event) {
//   event.preventDefault();
//   if (
//     document.querySelector("#password").value ===
//     document.querySelector("#repeatPassword").value
//   ) {
//     const name = document.querySelector("#name").value;
//     const password = document.querySelector("#password").value;

//     const response = await fetch("/api/auth/signup", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, password }),
//     });
//     const result = await response.json();
//     console.log(result);
//   } else {
//     alert("Passwords do not match");
//   }
// }
