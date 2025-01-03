document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.querySelector("#password");
    const toggleButton = document.querySelector(".toggle-password");
    const loginForm = document.querySelector("#loginForm");
    const popup = document.querySelector("#loading-popup");
    const popupContent = popup.querySelector(".popup-content");
    let toggleTimeout;
  
    toggleButton.addEventListener("click", function () {
      clearTimeout(toggleTimeout);
      
      passwordInput.setAttribute("type", "text");
      this.querySelector("svg").style.fill = "#667eea";
      
      toggleTimeout = setTimeout(() => {
        passwordInput.setAttribute("type", "password");
        this.querySelector("svg").style.fill = "#a0aec0";
      }, 500);
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
