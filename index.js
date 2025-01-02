document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.querySelector("#password");
  const toggleButton = document.querySelector(".toggle-password");
  const loginForm = document.querySelector("#loginForm");
  const popup = document.querySelector("#loading-popup");
  const popupContent = popup.querySelector(".popup-content");
  let previewTimeout;
  let lastLength = 0;

  passwordInput.addEventListener("input", function (e) {
    const currentValue = this.value;
    const cursorPosition = this.selectionStart;

    if (currentValue.length > lastLength) {
      clearTimeout(previewTimeout);

      const maskedValue =
        "•".repeat(currentValue.length - 1) +
        currentValue[currentValue.length - 1];
      this.type = "text";
      this.value = maskedValue;

      previewTimeout = setTimeout(() => {
        this.type = "password";
        this.value = currentValue;
        this.setSelectionRange(cursorPosition, cursorPosition);
      }, 1000);
    }

    lastLength = currentValue.length;
  });
  toggleButton.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.querySelector("svg").style.fill =
      type === "password" ? "#a0aec0" : "#667eea";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = passwordInput.value;

    if (!username || !password) {
      if (!username) document.querySelector("#username").classList.add("error");
      if (!password) passwordInput.classList.add("error");
      return;
    }

    popup.classList.add("visible");

    setTimeout(() => {
      popupContent.innerHTML = `
<div class="success-icon">
<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
</svg>
</div>
<p class="loading-text">You're in! Welcome back!</p>
<p class="loading-text" style="font-size: 0.9rem; margin-top: 0.5rem;">Window will close in 5 seconds...</p>
`;

      let secondsLeft = 5;
      const countdownInterval = setInterval(() => {
        secondsLeft--;
        const countdownElement = popupContent.querySelector("p:last-child");
        if (countdownElement) {
          countdownElement.textContent = `Window will close in ${secondsLeft} seconds...`;
        }

        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
          try {
            window.close();
          } catch (e) {
            popupContent.innerHTML = `
    <div class="success-icon">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <p class="loading-text">You're in! Welcome back!</p>
    <p class="loading-text" style="font-size: 0.9rem; margin-top: 0.5rem;">Please close this window manually</p>
  `;
          }
        }
      }, 1000);
    }, 2000);

    console.log("Login submitted:", { username, password });
  });

  document.querySelectorAll(".input-field").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error");
    });
  });
});
