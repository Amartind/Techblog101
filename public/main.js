const navbar = document.querySelector("#Navbar");

const logoutLink = document.querySelector("#logoutLink");

logoutLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const logout = await fetch("/api/users/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (logout.ok) {
    location.href = "/";
  } else {
    alert("Something weird happened... Try again later!");
  }
});
