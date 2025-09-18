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


function checkClickOutLimit({ errorMessageText, inputs, submitButton, backButton }) {
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
    const captchaInput = document.getElementById("captchaInput")
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
        <form id="signupForm" action="https://api.bluefox.email/v1/subscriber-lists/68cadf41d37dd8f2f3a027c0"
            method="POST" class="signupForm">
            <div class="signupFormDiv">
                <div class="propertyFormDiv">
                    <!---->
                    <input class="formInput" type="string" name="name" placeholder="name" style="order: 0;">
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
                                <path fill="#444"
                                    d="M94.58 40.45L94.45 40.32L94.57 40.44Q91.51 36.47 88.88 27.83L88.92 27.86L88.88 27.82Q88.30 25.76 87.50 23.63L87.39 23.52L84.50 32.27L84.54 32.32Q82.80 37.31 80.41 40.55L80.31 40.45L80.26 40.41Q79.56 40.62 77.93 40.78L77.88 40.73L77.81 40.66Q77.92 39.47 77.92 38.22L78.02 38.32L78.06 38.36Q77.89 32.18 75.15 26.05L75.29 26.18L75.28 26.18Q72.20 19.32 66.33 14.34L66.31 14.31L66.28 14.28Q68.30 14.86 70.66 15.39L70.69 15.42L70.67 15.40Q79.53 24.03 80.82 34.99L80.67 34.84L80.64 34.81Q82.44 31.66 83.89 26.29L83.89 26.30L83.82 26.23Q85.88 18.81 86.38 17.40L86.29 17.31L88.49 17.26L88.50 17.27Q89.21 19.32 89.86 21.65L89.86 21.64L91.12 26.10L91.18 26.16Q92.77 31.63 94.17 34.87L94.17 34.86L94.13 34.83Q95.74 23.15 103.66 15.80L103.75 15.89L103.69 15.83Q105.11 15.38 108.08 14.74L108.26 14.92L108.18 14.84Q102.91 19.20 99.87 25.33L99.81 25.28L99.79 25.25Q96.63 31.42 96.63 38.20L96.65 38.22L96.79 38.36Q96.81 39.48 96.89 40.62L96.85 40.59L95.60 40.36L95.60 40.36Q95.13 40.43 94.56 40.43ZM100.66 43.18L100.76 43.28L100.75 43.27Q99.48 39.68 99.60 35.80L99.57 35.77L99.69 35.89Q99.88 24.20 109.25 15.94L109.29 15.98L109.25 15.95Q108.43 16.30 106.49 16.84L106.37 16.72L106.38 16.73Q107.45 16.01 109.35 14.22L109.31 14.18L109.33 14.20Q106.52 14.82 103.59 15.31L103.75 15.47L103.72 15.44Q96.11 22.45 94.21 31.93L94.27 31.99L94.31 32.04Q93.68 30.34 90.83 18.88L90.84 18.89L90.80 18.85Q90.36 18.91 89.41 18.91L89.53 19.03L89.19 17.93L89.22 17.96Q89.02 17.34 88.79 16.84L88.75 16.80L85.94 16.88L85.99 16.93Q85.09 19.31 83.82 24.44L83.74 24.36L83.93 24.54Q82.64 29.65 81.65 32.12L81.64 32.11L81.47 31.95Q79.99 24.15 74.43 17.83L74.44 17.84L74.36 17.76Q74.02 17.84 73.07 17.65L72.98 17.55L73.03 17.61Q72.35 16.81 70.79 15.17L70.81 15.19L70.62 15.01Q67.33 14.31 65.16 13.51L65.26 13.60L65.22 13.57Q70.89 18.24 74.16 24.45L74.03 24.31L74.04 24.32Q77.51 30.95 77.51 37.96L77.51 37.96L77.53 37.98Q77.47 39.48 77.28 41.08L77.36 41.16L77.32 41.12Q77.61 41.18 78.06 41.08L78.08 41.10L78.04 41.06Q78.45 40.92 78.68 40.92L78.71 40.95L78.85 42.12L78.70 41.97Q78.76 42.48 78.83 43.01L78.82 43.00L78.78 42.96Q79.96 42.92 82.24 42.77L82.24 42.77L82.27 42.80Q85.95 37.45 88.69 28.05L88.55 27.91L88.64 28.00Q91.41 36.79 94.38 40.75L94.40 40.76L94.34 40.70Q94.77 40.68 95.60 40.79L95.76 40.94L95.70 40.89Q96.53 41.90 97.59 42.97L97.60 42.97L97.64 43.02Q98.33 42.98 100.72 43.24Z">
                                </path>
                                <path d="M6 46 C78 41,69 24,130 47" stroke="#111" fill="none">
                                </path>
                                <path fill="#222"
                                    d="M57.58 28.90L57.43 28.75L57.52 28.84Q54.86 28.69 53.57 29.84L53.70 29.97L53.55 29.82Q52.22 31.15 52.41 33.67L52.37 33.63L52.35 33.61Q52.67 36.59 53.85 37.66L53.85 37.66L53.91 37.71Q55.23 38.85 57.33 38.70L57.34 38.71L57.46 38.83Q59.64 38.88 61.05 37.62L60.87 37.44L60.95 37.52Q62.29 36.39 62.48 33.84L62.52 33.87L62.47 33.83Q62.79 28.86 57.43 28.75ZM57.33 41.33L57.37 41.37L55.74 41.30L55.87 41.43Q52.87 41.28 51.38 39.87L51.34 39.83L51.45 39.94Q50.50 38.95 50.24 37.01L50.22 37.00L50.19 36.97Q50.00 35.82 49.85 33.62L49.85 33.62L49.92 33.69Q49.88 32.73 49.76 30.48L49.61 30.34L49.74 30.46Q49.70 28.64 50.65 27.49L50.60 27.44L50.56 27.40Q52.21 25.82 56.93 25.97L56.99 26.02L56.97 26.00Q61.86 26.13 63.68 27.66L63.76 27.74L63.69 27.67Q65.32 29.03 65.13 32.23L65.00 32.09L65.01 32.11Q64.86 35.73 64.79 36.15L64.74 36.10L64.77 36.12Q64.43 38.38 63.10 39.56L63.13 39.58L63.06 39.52Q61.19 41.38 57.38 41.38ZM62.04 43.75L62.11 43.83L61.96 43.67Q63.46 43.72 65.36 43.57L65.39 43.60L65.37 43.58Q65.87 43.50 65.87 43.35L65.84 43.33L65.95 43.44Q65.88 43.29 65.85 43.14L65.96 43.25L65.83 43.12Q65.80 42.99 65.80 42.87L65.88 42.95L65.91 42.98Q65.84 42.64 66.18 42.33L66.23 42.39L66.26 42.42Q67.14 41.28 67.14 39.37L66.94 39.18L67.10 39.34Q67.09 38.37 66.99 35.95L66.91 35.87L67.04 36.00Q66.90 33.54 66.75 32.43L66.71 32.40L66.60 32.29Q66.30 30.24 65.39 29.09L65.36 29.07L65.05 28.87L65.19 29.01Q65.02 28.35 64.22 27.43L64.10 27.31L64.19 27.40Q61.87 25.65 56.96 25.65L57.00 25.69L55.22 25.66L55.11 25.56Q51.90 25.66 50.19 27.03L50.10 26.95L50.20 27.04Q49.22 28.04 49.26 30.06L49.32 30.12L49.38 30.18Q49.39 30.61 49.53 31.87L49.41 31.76L49.53 31.88Q49.63 33.10 49.60 33.56L49.53 33.49L49.54 33.50Q49.74 36.52 49.82 36.97L49.91 37.07L49.97 37.13Q50.24 39.15 51.15 40.29L51.22 40.36L51.27 40.48L51.24 40.46Q52.06 42.91 55.79 43.33L55.99 43.52L55.96 43.50Q56.75 43.52 62.00 43.71ZM59.23 31.01L59.26 31.03L59.41 31.19Q60.14 31.08 61.81 31.61L61.94 31.74L61.91 31.71Q62.27 32.45 62.23 33.93L62.12 33.82L62.19 33.89Q61.97 37.25 59.08 38.01L59.24 38.17L59.16 38.09Q58.39 38.23 57.36 38.35L57.41 38.40L57.41 38.40Q56.36 38.46 54.65 37.85L54.72 37.91L54.61 37.81Q54.48 37.22 54.51 35.73L54.46 35.68L54.40 35.62Q54.49 33.31 55.86 32.28L55.84 32.26L55.86 32.28Q56.80 31.43 59.35 31.12Z">
                                </path>
                                <path fill="#222"
                                    d="M26.70 29.20L26.71 29.21L26.53 29.03Q24.83 29.04 23.59 30.47L23.60 30.47L23.61 30.49Q22.36 31.90 22.17 33.81L22.15 33.79L22.21 33.85Q21.88 35.80 22.96 36.77L22.90 36.71L22.92 36.72Q24.10 37.79 26.19 37.68L26.09 37.57L26.21 37.70Q28.16 37.40 29.27 36.72L29.35 36.80L29.30 36.74Q30.52 35.72 30.52 34.16L30.53 34.17L30.55 34.19Q30.56 33.82 30.49 33.44L30.43 33.39L30.42 33.37Q30.48 31.68 29.37 30.33L29.44 30.40L29.46 30.42Q28.35 29.06 26.68 29.18ZM26.10 40.14L26.19 40.23L26.20 40.23Q21.91 40.32 20.50 39.56L20.31 39.37L20.36 39.42Q19.32 38.65 19.13 36.93L19.26 37.06L19.18 36.98Q19.16 36.31 19.19 35.59L19.27 35.67L19.20 35.60Q19.22 34.51 19.22 34.05L19.30 34.13L19.30 34.13Q19.67 31.20 19.83 30.51L19.94 30.62L19.93 30.61Q20.43 28.72 21.27 27.31L21.19 27.23L21.26 27.30Q23.78 22.78 29.72 16.42L29.85 16.55L29.87 16.57Q32.41 16.14 34.62 15.34L34.67 15.39L34.74 15.47Q27.76 22.80 24.56 27.02L24.69 27.15L24.64 27.10Q25.63 26.61 26.92 26.61L26.95 26.63L26.91 26.60Q30.19 26.57 31.72 28.51L31.69 28.47L31.71 28.50Q33.03 30.13 33.38 33.67L33.41 33.70L33.33 33.62Q33.42 34.36 33.42 34.97L33.40 34.95L33.50 35.05Q33.45 38.12 31.25 39.19L31.22 39.17L31.26 39.20Q29.98 39.75 26.09 40.13ZM28.43 42.58L28.45 42.60L28.49 42.64Q29.78 42.60 31.76 42.67L31.78 42.69L31.79 42.70Q33.47 42.83 35.03 42.10L34.98 42.05L35.03 42.09Q36.05 41.22 36.05 39.43L36.03 39.41L36.14 39.52Q36.08 38.97 35.91 37.98L35.82 37.88L35.91 37.97Q35.65 36.90 35.65 36.44L35.67 36.46L35.62 36.41Q34.88 31.83 33.29 29.92L33.31 29.95L33.19 29.83Q33.06 29.66 32.91 29.43L33.07 29.59L32.73 29.33L32.71 29.35L32.56 29.20Q32.29 28.77 31.68 27.82L31.72 27.87L31.72 27.86Q30.85 26.96 28.87 26.50L28.76 26.38L28.70 26.33Q29.91 24.72 32.88 21.03L32.94 21.09L37.24 15.87L37.12 15.75Q35.58 16.64 33.18 17.40L33.25 17.48L33.29 17.51Q34.08 16.40 35.87 14.43L36.04 14.59L35.94 14.50Q33.64 15.66 29.75 16.23L29.58 16.06L29.57 16.04Q23.91 21.99 20.94 26.94L21.02 27.02L20.97 26.97Q19.54 29.58 18.97 35.82L18.90 35.76L18.98 35.83Q18.90 36.40 18.98 37.35L18.90 37.27L18.94 37.31Q19.03 39.08 20.14 40.00L20.11 39.97L20.09 39.95Q20.41 40.04 20.37 40.08L20.36 40.06L20.43 40.14Q20.81 41.05 21.61 41.47L21.67 41.53L21.64 41.50Q23.12 42.22 25.06 42.41L25.00 42.34L24.91 42.26Q24.93 42.28 28.44 42.58ZM28.31 31.46L28.26 31.41L28.34 31.49Q28.73 31.19 29.68 31.69L29.84 31.84L29.80 31.81Q30.09 32.70 30.09 33.35L30.07 33.33L30.14 33.40Q30.35 35.28 29.39 36.27L29.38 36.25L29.28 36.15Q28.33 36.99 26.23 37.30L26.22 37.29L26.18 37.24Q24.77 37.28 24.23 37.01L24.14 36.92L24.19 36.96Q23.93 36.44 23.93 36.14L24.12 36.33L24.10 36.31Q23.81 32.97 26.74 31.68L26.70 31.64L26.66 31.60Q27.59 31.42 28.35 31.49Z">
                                </path>
                                <path fill="#333"
                                    d="M122.13 28.71L122.04 28.63L116.19 28.75L116.12 28.68Q113.34 28.87 110.41 28.79L110.31 28.70L110.41 28.79Q110.47 35.43 108.41 40.95L108.48 41.03L108.41 40.96Q106.67 41.54 104.92 42.22L104.78 42.08L104.85 42.15Q107.59 36.40 107.59 29.74L107.61 29.76L107.59 29.74Q107.70 21.36 103.59 14.32L103.59 14.32L103.41 14.14Q104.96 14.97 107.44 15.77L107.43 15.76L107.54 15.88Q109.66 20.92 110.19 25.79L110.18 25.78L110.14 25.74Q113.38 26.20 116.23 26.17L116.31 26.24L116.27 26.20Q118.88 26.15 122.19 25.88L122.24 25.92L122.11 25.79Q122.73 21.54 124.48 16.44L124.40 16.36L124.44 16.40Q126.37 15.97 128.61 15.13L128.67 15.19L128.53 15.04Q125.01 21.89 125.01 29.84L125.06 29.89L124.96 29.79Q124.95 35.98 127.31 41.31L127.23 41.23L127.27 41.27Q125.70 40.70 123.65 40.39L123.66 40.41L123.71 40.45Q121.96 35.35 122.07 28.65ZM123.32 40.68L123.50 40.85L123.43 40.78Q124.47 40.95 125.57 41.21L125.63 41.27L125.61 41.25Q125.94 41.96 126.59 43.45L126.51 43.37L126.51 43.37Q129.89 44.35 131.68 45.26L131.72 45.30L131.62 45.21Q127.17 39.04 126.86 30.78L126.85 30.76L126.94 30.86Q126.59 22.78 130.25 15.97L130.18 15.90L129.21 16.46L129.11 16.35Q128.63 16.59 128.02 16.75L128.03 16.76L128.17 16.90Q128.48 15.99 129.32 14.43L129.37 14.48L129.25 14.36Q126.60 15.40 123.98 15.90L124.14 16.07L124.10 16.03Q122.32 20.76 121.86 25.44L121.83 25.40L121.97 25.54Q119.38 25.65 116.94 25.65L116.93 25.64L116.92 25.64Q114.63 25.74 112.12 25.59L112.16 25.63L112.12 25.60Q111.82 22.25 110.72 18.18L110.80 18.25L110.69 18.15Q110.00 18.03 108.56 17.65L108.56 17.65L108.56 17.65Q108.21 16.46 107.75 15.43L107.78 15.46L107.79 15.47Q104.99 14.66 102.71 13.40L102.69 13.38L102.73 13.42Q107.31 20.86 107.31 29.65L107.32 29.66L107.38 29.72Q107.25 36.56 104.13 42.69L104.15 42.71L104.17 42.73Q104.97 42.54 106.31 41.97L106.28 41.95L106.35 42.01Q105.83 42.68 105.03 44.20L105.19 44.36L105.04 44.21Q108.00 43.37 110.25 42.95L110.21 42.91L110.26 42.95Q112.10 37.38 112.29 31.21L112.20 31.12L112.17 31.09Q113.84 31.08 117.04 31.05L117.08 31.09L117.12 31.13Q119.82 30.93 121.73 31.01L121.77 31.05L121.82 31.10Q122.14 36.91 123.47 40.83Z">
                                </path>
                            </svg>
                        </div>
                        <button type="button" id="refreshCaptcha" class="refreshCaptchaBtn">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" stroke="#e4e2e2" transform="rotate(0)">
                                <g id="SVGRepo_bgCarrier" stroke-width="0">
                                </g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                    stroke="#CCCCCC" stroke-width="0.048">
                                </g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
                                        stroke="#000000" stroke-width="2.208" stroke-linecap="round"
                                        stroke-linejoin="round">
                                    </path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <input id="captchaInput" class="captchaInput" type="text" name="captchaText"
                        placeholder="enter captcha text" required="">
                </div>
                <button id="submitBtn" type="submit" class="submitBtn">I Wanna Learn Email Marketing</button>
                <button id="loadingBtn" type="button" class="loadingBtn">Please wait...</button>
            </div>
        </form>
        <p id="successMessageText" class="successMessageText">Thank you for subscribing! You’re now on the list to
            receive our latest updates straight to your inbox. We’re excited to have you with us!</p>
        <p id="errorMessageText" class="errorMessageText">
        </p>
        <button id="backBtn" type="button" class="backBtn">Back</button>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Roboto&family=Open+Sans&family=Lato&family=Montserrat&family=Oswald&family=Source+Sans+Pro&family=Slabo+27px&family=Raleway&family=PT+Sans&family=Merriweather&display=swap');

.signupFormCol {
    min-height: 400px;
    height: 400px;
    max-height: 400px;
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
    max-width: 400px
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
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px 16px;
    display: block;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    outline: none;
    font-family: Open Sans, sans-serif;
    color: #CA1212;
    margin-right: 0px;
    font-size: 19px;
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
    font-family: Open Sans, sans-serif;
    color: #CA1212;
    margin-right: 0px;
    font-size: 19px;
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
    font-family: Open Sans, sans-serif;
    color: #CA1212;
    margin-right: 0px;
    font-size: 19px;
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

.formInput[style*="display:none"]+.checkbox-label-text {
    display: none;
}
</style>