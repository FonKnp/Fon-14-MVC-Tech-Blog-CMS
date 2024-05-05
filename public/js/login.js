const loginFormHandler = async (event) => {
  event.preventDefault();

  //collect values from login form
  const email = document.querySelector("#email-login").val.trim();
  const password = document.querySelector("#password-login").val.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/login" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").val.trim();
};
