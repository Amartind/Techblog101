console.log("signup link");
const signUpBtn = document.querySelector("#signup");

signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("you submitted the form");
  const newUserObj = {
    username: document.querySelector("#signUpUsername").value,
    password: document.querySelector("#signUpPassword").value,
  };

  const createNewUser = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(newUserObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(createNewUser);
  if (createNewUser.ok) {
    location.href = "/dashboard";
  } else {
    console.log("something went wrong");
  }
});