const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const loginObj = {
    username: document.querySelector("#loginUsername").value,
    password: document.querySelector("#loginPassword").value,
  };

  fetch("/api/users/signin", {
    method: "POST",
    body: JSON.stringify(loginObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      location.href = "/dashboard";
    } else {
      console.log(res.json());
    }
  });
});