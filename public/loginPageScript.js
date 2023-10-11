const loginBtn = document.querySelector("#loginBtn");

async function loginUser(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });
  const result = await response.json();
  console.log(result);
  if (result.status === "Success") {
    localStorage.setItem("token", result.token);
    window.location.replace("/");
  } else {
    alert(result.error);
  }
}

loginBtn.addEventListener("click", loginUser);
