<script setup>
import { onMounted } from 'vue'
  
  let captchaProbe 
  function generateCaptcha() {
    const captchaDiv = document.getElementById('captchaDiv')
    fetch("https://api.bluefox.email/v1/captcha")
      .then(response => response.json()) 
      .then(captchaData => {
        captchaDiv.innerHTML = captchaData.result.data
        captchaProbe = captchaData.result.probe
      })
      .catch(error => {
        console.error("Error fetching CAPTCHA:", error)
        captchaDiv.innerHTML = error.message
      })
  }
  

  function checkClickOutLimit ({ errorMessageText, inputs, submitButton, backButton }){
    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem("timestamp")
    if (previousTimestamp && Number(previousTimestamp) + 5000 > timestamp) {
      
        const captchaContainer = document.getElementById("captchaContainer")
        captchaContainer.style.display = "none"
      errorMessageText.innerText = "Too many signups, please try again in a little while"
      inputs.forEach(input => {
      if (input) {
          input.style.display = "none"
          const label = input.closest('label.formCheckboxInput')
          if (label) {
            label.style.display = 'none'
          }
        }
      })
      submitButton.style.display = "none"
      errorMessageText.style.display = "block"
      backButton.style.display = "block"
      return true
    }
  }

  function submitHandler(event) {
    event.preventDefault()
    const form = document.getElementById("signupForm")
    const inputs = document.querySelectorAll(".formInput")
    const successMessageText = document.getElementById("successMessageText")
    const errorMessageText = document.getElementById("errorMessageText")
    const submitButton = document.getElementById("submitBtn")
    const loadingButton = document.getElementById("loadingBtn")
    const backButton = document.getElementById("backBtn")
    const captchaInput= document.getElementById("captchaInput")  
    const description = document.getElementById("description")
    if (checkClickOutLimit({ errorMessageText, inputs, submitButton, backButton })) {
      return
    }

    localStorage.setItem("timestamp", Date.now())

    submitButton.style.display = "none"
    loadingButton.style.display = "block"
    let data = {}
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        data[input.name] = input.checked
      } else {
        data[input.name] = input.value
      }
    })
    
      data.captchaText = captchaInput.value
      data.captchaProbe = captchaProbe
    fetch(event.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          successMessageText.style.display = "block"
          form.reset()
        } else {
          dataPromise.then(data => {
            errorMessageText.style.display = "block"
            if (data.status === 401) {
              errorMessageText.innerText = 'Domain not whitelisted. Please contact support.'
            } else {
              errorMessageText.innerText = data.error.message || res.statusText
            }
          })
        }
      })
      .catch(error => {
        if (error.message === "Failed to fetch") {
          checkClickOutLimit({ errorMessageText, inputs, submitButton, backButton })
          return
        }
        errorMessageText.style.display = "block";
        errorMessageText.innerText = error.message || "An unexpected error occurred."
        localStorage.removeItem("timestamp")
      })
      .finally(() => {
        captchaContainer.style.display = "none"
        inputs.forEach(input => {
          if (input) {
            input.style.display = "none"
            const label = input.closest('label.formCheckboxInput')
            if (label) {
              label.style.display = 'none'
            }
          }
        })
        loadingButton.style.display = "none"
        backButton.style.display = "block"
        description.style.display = "none"
      })
  }

  function resetFormHandler() {
    const inputs = document.querySelectorAll(".formInput")
    const successMessageText = document.getElementById("successMessageText")
    const errorMessageText = document.getElementById("errorMessageText")
    const submitButton = document.getElementById("submitBtn")
    const backButton = document.getElementById("backBtn")
    
      const captchaContainer = document.getElementById("captchaContainer")
      captchaContainer.style.display = "flex"   
      generateCaptcha()
     
    successMessageText.style.display = "none"
    errorMessageText.style.display = "none"
    errorMessageText.innerText = "Oops! Something went wrong, please try again."
    backButton.style.display = "none"
    inputs.forEach(input => {
      if (input) {
        input.style.display = "block"
        const label = input.closest('label.formCheckboxInput')
        if (label) {
          label.style.display = 'flex'
        }
      }
    })
    submitButton.style.display = "block"
  }


onMounted(() => { // please keep this onmount section and u can replace everything else
    const refreshButton = document.getElementById("refreshCaptcha")
    if (refreshButton && !refreshButton.classList.contains('handlers-added')) {
        refreshButton.addEventListener("click", generateCaptcha)
        refreshButton.classList.add("handlers-added")
    }
    generateCaptcha()

    const signupForm = document.getElementById("signupForm")
    if (signupForm && !signupForm.classList.contains('handlers-added')) {
        signupForm.addEventListener("submit", submitHandler)
        signupForm.classList.add("handlers-added")
    }

    const backButton = document.getElementById("backBtn")
    if (backButton && !backButton.classList.contains('handlers-added')) {
        backButton.addEventListener("click", resetFormHandler)
        backButton.classList.add("handlers-added")
    }
})
</script>

<template>
    <div id="signupFormContainer" class="signupFormContainer">
<form id="signupForm" action="https://api.bluefox.email/v1/subscriber-lists/68cadf41d37dd8f2f3a027c0" method="POST" class="signupForm">
<div class="signupFormDiv">
<h2 style="border: 0; margin-top: 10px; margin-bottom: 10px;">Get Free Worksheets + Bonus Videos</h2>
<div class="propertyFormDiv">
<!---->
<!---->
</div>
<div class="propertyFormDiv">
<!---->
<!---->
</div>
<div class="propertyFormDiv">
<!---->
<!---->
</div>
<div class="propertyFormDiv">
<!---->
<!---->
</div>
<div class="propertyFormDiv">
<input class="formInput" type="email" name="email" placeholder="your@email.com" required="">
<!---->
</div>
<div id="captchaContainer" class="captchaContainer">
<div class="captchaContainerDev">
<div id="captchaDiv" class="captchaDiv">
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="50" viewBox="0,0,150,50">
<path d="M21 11 C71 40,80 24,137 16" stroke="#777" fill="none">
</path>
<path fill="#444" d="M119.41 27.26L119.34 27.20L119.29 27.15Q120.07 27.12 121.47 26.97L121.57 27.07L121.55 27.05Q121.42 27.60 121.42 28.24L121.45 28.28L121.46 29.55L121.39 29.47Q120.59 29.51 119.75 29.58L119.80 29.63L119.77 29.61Q118.89 29.60 118.05 29.56L118.21 29.72L118.05 29.56Q115.37 35.91 111.95 40.51L111.80 40.37L111.89 40.46Q109.43 41.16 108.14 41.77L107.98 41.61L108.11 41.74Q112.16 35.96 115.20 29.68L115.16 29.64L112.63 29.74L112.57 29.68Q112.64 28.42 112.53 27.08L112.48 27.04L112.40 26.96Q114.32 27.12 116.37 27.12L116.52 27.27L118.31 23.47L118.25 23.40Q119.26 21.52 120.48 19.92L120.62 20.07L120.49 19.93Q118.95 20.10 117.35 20.10L117.39 20.15L117.32 20.08Q111.32 20.17 107.55 17.96L107.51 17.92L106.86 16.20L106.78 16.12Q106.60 15.45 106.22 14.57L106.15 14.50L106.13 14.48Q110.56 17.20 116.27 17.43L116.16 17.32L116.28 17.43Q121.30 17.54 126.44 15.56L126.49 15.62L126.45 15.58Q126.28 16.01 125.78 16.89L125.81 16.91L125.87 16.98Q122.09 21.57 119.23 27.09ZM127.31 18.18L127.38 18.26L128.34 16.21L128.46 16.33Q127.36 16.68 125.69 17.40L125.84 17.55L125.87 17.09L125.91 17.13Q126.00 16.96 126.12 16.84L126.25 16.98L126.19 16.91Q126.49 16.15 127.22 14.82L127.21 14.81L127.22 14.83Q121.87 17.09 116.12 16.86L116.21 16.95L116.13 16.87Q110.27 16.76 105.51 13.79L105.41 13.69L105.35 13.63Q106.50 15.61 107.33 18.27L107.21 18.15L107.34 18.28Q108.47 18.95 109.27 19.25L109.23 19.22L109.29 19.27Q109.34 19.52 109.80 21.39L109.79 21.37L109.78 21.37Q112.93 22.62 118.45 22.47L118.55 22.56L118.49 22.50Q118.11 23.00 116.13 26.76L116.26 26.90L116.26 26.90Q114.23 26.92 112.25 26.73L112.19 26.67L112.24 26.72Q112.23 27.47 112.23 28.35L112.30 28.42L112.18 30.01L113.97 30.12L113.86 31.42L113.87 31.43Q109.99 38.86 107.21 42.44L107.15 42.38L107.15 42.38Q108.88 41.75 110.51 41.25L110.47 41.20L110.37 41.10Q109.85 42.19 108.48 43.90L108.39 43.81L108.29 43.71Q111.46 42.61 113.90 42.39L113.96 42.45L113.98 42.47Q116.89 38.68 120.01 31.90L120.10 31.99L123.39 32.05L123.49 32.14Q123.47 31.29 123.47 30.38L123.44 30.34L123.35 28.47L123.31 28.42Q123.18 28.56 122.63 28.60L122.62 28.59L122.48 28.45Q122.03 28.59 121.76 28.59L121.78 28.61L121.67 28.50Q121.82 28.53 121.86 28.38L121.70 28.22L121.81 28.06L121.82 28.07Q124.37 22.97 127.45 18.33Z">
</path>
<path fill="#444" d="M19.99 41.11L20.05 41.16L20.02 41.14Q23.21 36.90 29.91 28.98L29.81 28.88L29.88 28.95Q23.96 29.16 20.19 27.79L20.17 27.78L20.09 27.69Q19.48 26.32 18.72 24.91L18.74 24.93L18.67 24.87Q22.93 26.53 27.38 26.57L27.22 26.41L27.20 26.39Q31.82 26.59 36.00 25.52L35.85 25.37L35.86 25.38Q35.46 26.05 35.19 26.58L35.22 26.60L35.20 26.58Q32.77 28.91 29.95 32.53L29.97 32.55L24.98 38.67L24.97 38.66Q27.23 38.49 29.48 38.56L29.50 38.59L29.58 38.66Q31.65 38.60 33.89 38.98L33.84 38.93L33.90 38.99Q34.00 39.54 34.72 41.56L34.78 41.62L34.75 41.59Q31.14 40.88 27.15 40.99L27.02 40.87L27.04 40.89Q23.09 41.01 19.43 42.19L19.48 42.24L19.44 42.19Q19.55 42.08 20.01 41.12ZM18.78 42.72L18.96 42.89L18.91 42.85Q19.63 42.46 21.23 42.04L21.23 42.04L21.32 42.13Q21.11 42.38 20.69 42.80L20.67 42.78L20.67 42.78Q20.30 43.21 19.69 44.35L19.85 44.51L19.67 44.32Q24.52 43.13 29.51 43.28L29.55 43.32L29.37 43.14Q34.44 43.41 39.01 45.28L38.96 45.23L38.89 45.16Q37.47 43.32 36.55 41.26L36.61 41.32L36.63 41.34Q35.79 40.96 34.72 40.73L34.72 40.72L34.73 40.73Q34.59 40.06 34.21 38.61L34.30 38.70L34.31 38.71Q32.72 38.34 29.14 38.22L29.21 38.29L29.20 38.29Q31.48 34.85 36.50 28.50L36.42 28.42L36.58 28.57Q36.87 27.88 37.56 26.54L37.46 26.45L35.16 27.19L35.19 27.22Q35.27 27.15 35.42 27.03L35.47 27.08L35.63 26.86L35.65 26.88Q35.99 25.70 36.56 24.75L36.67 24.86L36.68 24.87Q31.92 26.13 27.20 26.05L27.22 26.07L27.20 26.04Q22.48 26.05 17.99 24.22L18.02 24.25L17.97 24.20Q19.16 26.07 19.96 28.13L20.00 28.17L19.92 28.09Q20.71 28.35 21.78 28.62L21.88 28.72L21.92 28.76Q22.00 29.33 22.30 30.78L22.37 30.84L22.33 30.81Q23.95 31.10 27.26 31.25L27.29 31.28L27.35 31.34Q24.77 34.46 19.59 40.89L19.74 41.05L19.67 40.98Q19.38 41.53 18.81 42.74Z">
</path>
<path fill="#111" d="M85.63 40.23L85.70 40.30L85.57 40.17Q82.10 40.28 80.46 39.75L80.58 39.87L80.56 39.84Q78.44 39.06 78.14 35.67L78.22 35.76L79.62 34.64L79.69 34.72Q80.34 34.11 81.10 33.62L81.26 33.77L81.16 33.68Q80.87 35.55 82.46 36.77L82.51 36.82L82.49 36.79Q83.73 37.77 85.87 37.58L85.85 37.56L85.84 37.55Q90.26 37.18 90.07 33.64L90.04 33.61L90.17 33.73Q89.87 31.34 87.25 30.13L87.30 30.18L87.28 30.16Q84.46 29.13 82.10 27.91L82.11 27.92L82.19 28.00Q79.67 26.70 78.68 22.01L78.52 21.86L78.52 21.86Q78.41 21.40 78.29 20.64L78.44 20.79L78.27 20.62Q78.27 19.93 78.34 19.36L78.44 19.46L78.42 19.43Q78.41 17.67 79.67 17.22L79.77 17.32L79.84 17.39Q82.18 16.46 86.18 16.65L86.24 16.71L86.19 16.66Q87.94 16.70 88.74 16.78L88.82 16.86L88.85 16.89Q90.28 17.02 91.35 17.48L91.38 17.51L91.26 17.39Q93.49 17.98 93.72 20.46L93.61 20.35L93.64 20.38Q92.60 21.09 90.40 22.43L90.47 22.50L90.41 22.44Q89.93 19.37 85.55 19.37L85.63 19.45L85.65 19.47Q83.78 19.51 82.79 20.19L82.76 20.16L82.78 20.18Q81.50 20.57 81.73 22.36L81.86 22.50L81.80 22.44Q82.01 24.58 84.97 26.10L84.93 26.06L84.94 26.07Q85.63 26.45 90.12 28.09L90.08 28.05L90.11 28.08Q92.64 29.46 93.05 33.84L93.06 33.85L93.03 33.81Q92.99 33.93 93.07 35.19L93.26 35.38L93.21 35.33Q93.14 37.97 91.58 39.07L91.59 39.08L91.62 39.11Q89.81 40.11 85.62 40.23ZM87.88 42.56L87.86 42.54L87.95 42.64Q89.37 42.68 91.34 42.68L91.43 42.76L91.37 42.70Q93.36 42.60 94.62 42.18L94.68 42.25L94.79 42.35Q96.01 41.51 95.93 39.72L95.92 39.72L95.85 39.65Q95.88 38.73 95.50 36.67L95.45 36.62L95.50 36.66Q94.57 31.97 92.47 30.10L92.54 30.16L92.41 30.04Q91.60 28.43 90.27 27.71L90.32 27.76L84.92 25.59L85.08 25.75Q84.66 25.49 84.21 25.26L84.20 25.26L84.08 24.87L84.06 24.51L84.14 24.59Q83.91 23.09 85.05 22.49L85.17 22.61L85.10 22.53Q85.92 22.02 87.63 21.83L87.64 21.84L87.56 21.76Q88.69 21.64 89.84 22.10L89.90 22.16L89.79 22.05Q90.00 22.30 90.19 23.14L90.08 23.02L90.21 23.15Q90.32 22.92 90.82 22.69L90.71 22.59L90.77 22.65Q91.56 23.63 91.68 24.78L91.55 24.65L91.61 24.71Q91.68 24.66 95.33 22.07L95.32 22.06L95.46 22.20Q95.14 19.51 93.69 18.83L93.60 18.74L93.63 18.77Q93.08 17.53 91.63 17.00L91.57 16.94L91.60 16.97Q89.42 16.27 86.22 16.27L86.24 16.29L86.16 16.21Q81.19 16.16 79.33 16.84L79.36 16.87L79.35 16.86Q78.03 17.33 77.91 19.01L77.90 19.00L78.00 19.09Q77.85 19.52 78.27 21.72L78.27 21.72L78.29 21.74Q78.93 25.47 81.10 27.71L81.14 27.75L81.24 27.85Q81.94 29.46 83.44 30.15L83.46 30.17L83.50 30.21Q84.90 30.79 88.82 32.35L88.93 32.46L88.89 32.46L89.47 32.73L89.51 32.81L89.53 32.83Q89.73 33.30 89.77 33.64L89.74 33.61L89.75 33.62Q89.75 37.01 85.83 37.16L85.89 37.23L85.86 37.19Q84.77 37.28 83.47 36.90L83.44 36.86L83.39 36.82Q83.08 36.01 83.08 35.29L83.15 35.36L83.23 35.44Q83.13 35.07 83.17 34.81L83.17 34.81L83.19 34.83Q82.69 34.97 81.89 35.47L81.93 35.51L82.00 35.58Q81.46 34.43 81.61 33.06L81.59 33.04L81.59 33.03Q79.46 34.18 77.86 35.59L77.88 35.61L77.85 35.57Q78.02 36.50 78.09 37.53L77.98 37.42L78.06 37.50Q78.37 39.22 79.67 39.98L79.61 39.92L79.67 39.99Q81.00 41.93 83.55 42.31L83.51 42.27L83.54 42.30Q85.11 42.53 88.04 42.72Z">
</path>
<path fill="#333" d="M53.56 19.38L53.53 19.35L53.53 19.35Q54.35 23.56 54.50 27.14L54.52 27.15L54.60 27.24Q55.72 27.33 56.79 27.33L56.78 27.32L58.82 27.15L58.98 27.31Q59.88 27.14 60.75 25.73L60.86 25.84L60.82 25.81Q61.54 24.62 61.66 23.44L61.56 23.35L61.57 23.36Q62.09 20.49 57.87 19.99L57.79 19.91L57.75 19.88Q56.19 19.95 53.56 19.38ZM54.49 29.86L54.62 30.00L54.58 29.95Q54.51 36.17 53.37 40.58L53.38 40.59L53.29 40.51Q51.92 41.00 49.60 42.07L49.64 42.10L49.56 42.03Q51.98 35.42 51.71 28.15L51.76 28.20L51.73 28.17Q51.35 20.71 48.57 14.27L48.67 14.37L48.66 14.37Q52.74 17.08 58.99 17.08L58.98 17.07L59.06 17.15Q65.00 17.04 65.15 20.50L65.28 20.63L65.23 20.58Q65.19 22.90 64.20 25.57L64.27 25.63L64.32 25.68Q63.86 26.74 62.90 27.96L62.98 28.04L62.98 28.04Q61.55 29.54 59.00 29.80L59.15 29.95L59.00 29.81Q56.89 29.98 54.64 30.02ZM60.75 32.24L60.68 32.17L60.80 32.29Q64.94 32.51 66.19 27.71L66.02 27.54L66.19 27.71Q66.99 23.90 66.84 21.88L66.93 21.97L66.88 21.93Q66.82 20.46 66.06 19.47L66.02 19.42L66.03 19.44Q65.74 19.15 65.25 18.92L65.19 18.87L65.20 18.88Q65.20 18.72 64.59 17.96L64.50 17.88L64.65 18.02Q63.08 16.68 59.12 16.68L59.04 16.60L59.03 16.58Q52.12 16.57 47.89 13.41L47.92 13.43L48.03 13.55Q51.17 20.61 51.44 28.07L51.42 28.05L51.39 28.02Q51.61 35.62 48.94 42.70L48.93 42.69L49.07 42.83Q50.14 42.19 51.13 41.81L50.98 41.66L50.79 42.99L50.64 42.84Q50.53 43.50 50.27 44.07L50.33 44.13L50.20 44.00Q52.76 43.10 55.66 42.56L55.53 42.43L55.66 42.57Q56.42 36.98 56.50 32.25L56.53 32.28L56.50 32.26Q57.61 32.19 58.60 32.19L58.63 32.22L58.67 32.25Q59.85 32.10 60.65 32.14ZM59.65 22.16L59.66 22.17L59.78 22.29Q60.17 22.18 61.16 22.41L61.17 22.42L61.28 22.53Q61.41 22.77 61.45 23.08L61.41 23.04L61.42 23.05Q61.51 23.37 61.43 23.64L61.38 23.58L61.39 23.59Q61.14 24.67 60.41 25.55L60.51 25.65L60.43 25.56Q59.93 26.70 58.90 26.89L58.93 26.92L58.88 26.87Q58.12 26.83 56.48 26.83L56.48 26.83L56.42 26.77Q56.45 24.55 56.22 22.19L56.28 22.25L58.05 22.35L58.04 22.34Q58.85 22.31 59.73 22.24Z">
</path>
</svg>
</div>
<button type="button" id="refreshCaptcha" class="refreshCaptchaBtn">
<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e4e2e2" transform="rotate(0)">
<g id="SVGRepo_bgCarrier" stroke-width="0">
</g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048">
</g>
<g id="SVGRepo_iconCarrier">
<path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="#000000" stroke-width="2.208" stroke-linecap="round" stroke-linejoin="round">
</path>
</g>
</svg>
</button>
</div>
<input id="captchaInput" class="captchaInput" type="text" name="captchaText" placeholder="enter captcha text" required="">
</div>
<button id="submitBtn" type="submit" class="submitBtn">I Wanna Learn Email Marketing</button>
<button id="loadingBtn" type="button" class="loadingBtn">Please wait...</button>
<p id="description" style="font-size: 14px; line-height: 16px;">Subscribe to receive worksheets with every lesson, plus exclusive deep-dive videos you won’t find anywhere else.</p>
</div>
</form>
<p id="successMessageText" class="successMessageText">Thank you for subscribing! Please, verify your email address, and get access to our extra course materials. We’re excited to have you with us!</p>
<p id="errorMessageText" class="errorMessageText">
</p>
<button id="backBtn" type="button" class="backBtn">Back</button>
</div>
</template>

<style scoped>
.signupFormCol {
    min-height: 400px;
    height: 400px;
    max-height: 400px;
  }

  .formTitle {
    border-top: 0 !important;
    margin: 0;
  }

  .signupFormContainer {
    display: flex;
    flex-direction: column;
    align-items: center !important;
    justify-items: center;
    justify-content: center;
    height: 100%;
    max-height: 400px;
    background-color: transparent
  }

  .signupForm {
    margin: auto;
    padding: 20px;
    border-radius: 16px;
    box-shadow: none;
    width: 100%;
    display: block;
    max-width: 480px;
  }

  .signupFormDiv {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column
    
  }

  .propertyFormDiv {
    display: flex;
    width: 100%;
    flex: 1 0 100%;
  }
    
  .formInput {
    box-sizing:border-box;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px 16px;
    display: block;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    outline: none;
    font-family: Roboto, sans-serif;
    color: #000000;
    margin-right: 0px;
    font-size: 16px;
    width: 100%
  }

  .formCheckboxInput {
    display: flex;
    align-items: center;
    gap: 8px;    
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    outline: none;
    font-family: Roboto, sans-serif;
    color: #000000;
    margin-right: 0px;
    font-size: 16px;
    width: 100%;
  }

  .checkbox-label-text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .captchaContainer {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-right: 0px
  }

  .captchaContainerDev {
    max-height: 47px;
    border: 1px dashed #888;
    display: flex;
    border-radius: 4px;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-right: 5px;
  }

  .captchaDiv {
    display: block;
    width: 100%
  }

  .refreshCaptchaBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    background: transparent;
    border: none;
    font-family: Roboto, sans-serif;
    font-size: 16px                          
  }

  .captchaInput {
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px 16px;
    display: block;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
    outline: none;
    font-family: Roboto, sans-serif;
    color: #000000;
    margin-right: 0px;
    font-size: 16px; 
    width: 100%
  }

  .submitBtn {
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%; 
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: #10B1EF;
    color: #FFFFFF
  }

  .loadingBtn {
    display: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%; 
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: #10B1EF;
    color: #FFFFFF
  }


  .successMessageText {
    text-align: center;
    display: none;
    font-family: Roboto, sans-serif;
    color: #000000;
    font-size: 16px
  }

  .errorMessageText {
    display: none;
    text-align: center;
    font-family: Roboto, sans-serif;
    color: #000000;
    font-size: 16px
  }

  .backBtn {
    display: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: #10B1EF;
    color: #FFFFFF
  }
    
  .formInput[style*="display:none"] + .checkbox-label-text {
    display: none;
  }
</style>
