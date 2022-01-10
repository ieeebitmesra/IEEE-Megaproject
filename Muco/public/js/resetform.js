console.log("hello");
const appendAlert = (message) => {
  const alertBox = document.querySelector(".alert");
  alertBox.innerText = message;
  alertBox.classList.remove("hidden");
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
};
const token = document.querySelector(".reset_2_password").dataset.token;
console.log(token);
let url = `/api/v1/users/passwordReset/${token}`;
document.querySelector(".btn-reset").addEventListener("click", (e) => {
  e.preventDefault();
  const password = document.querySelector("#init-pwd").value;
  const confirmpassword = document.querySelector("#re-pwd").value;
  sendResetRequest({ password, confirmpassword });
});
async function sendResetRequest(reqBody) {
  const promise = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await promise.json();
  appendAlert(res.message);
}
