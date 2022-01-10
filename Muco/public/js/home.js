document.addEventListener("DOMContentLoaded", splashScreen);
function splashScreen() {
  setTimeout(() => {
    document.querySelector(".splash").classList.add("splashOut");
    document.querySelector(".splash").remove();
  }, 1500);
}
