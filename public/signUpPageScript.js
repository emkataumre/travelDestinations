const signUpBtn = document.querySelector("#signUpBtn");

async function createUser(event) {
  event.preventDefault();
  if (
    document.querySelector("#password").value ===
    document.querySelector("#repeatPassword").value
  ) {
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const result = await response.json();
  } else {
    alert("Passwords do not match");
  }
}

signUpBtn.addEventListener("click", createUser);
