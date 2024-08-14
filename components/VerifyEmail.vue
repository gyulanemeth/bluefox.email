<script setup>
import { ref } from 'vue'
import bluefoxEmailApiConnectors from '../connectors/bluefoxEmailApi.js'

const error = ref(false)
const verified = ref(false)
const loading = ref(true)
const token = ref(false)
const url = ref(false)


if (typeof window !== 'undefined') {
    token.value = new URLSearchParams(window.location.search).get('token')
    url.value = new URL(window.location);
}
if (token.value) {
    url.value.searchParams.delete('token');
    history.replaceState(null, '', url.value.pathname + url.value.search);
}
try {
    await bluefoxEmailApiConnectors().verifySubscription(token.value)
    verified.value = true
} catch (err) {
    error.value = true
}
loading.value = false
</script>


<template>
    <section id="subscribe" class="section">
        <div class="custom-section">
            <div v-if="loading">
                <h1 style="text-align: center;" class="loading-msg">
                    Verifying your email...
                </h1>
                <p style="text-align: center;">
                    This may take a few seconds. Thank you for your patience!
                </p>
            </div>
            <div v-else-if="verified">
                <h1 style="text-align: center;" class="success-msg">
                    Email Verified Successfully
                </h1>
                <p style="text-align: center;">
                    Congratulations! You have successfully verified your email address.
                </p>
            </div>
            <div v-else-if="error">
                <h1 style="text-align: center;" class="error-msg">
                    Something went wrong
                </h1>
                <p style="text-align: center;">
                    An unexpected error has occurred. Please try again later. If the issue continues, don't hesitate to
                    reach out to our support team.
                </p>
            </div>

            <div v-if="!loading" class="btn-inline-box">
                <a href="/" class="back-btn">Main Page</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f9f9f9;
}

.custom-section {
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding: 40px;
    border: 1px solid #f6f6f7;
    background: #ffffff;
    border-radius: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.loading-msg {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: bold;
    color: rgb(17, 176, 238);
}

.success-msg {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #4CAF50;
}

.error-msg {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #FF5252;
}

.btn-inline-box {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.back-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 20px;
    border: none;
    background-color: rgb(17, 176, 238);
    color: white;
    cursor: pointer;
    text-align: center;
    font-size: 1.25rem;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
    background-color: rgb(10, 140, 190);
}

@media only screen and (max-width: 767px) {
    .custom-section {
        width: 88%;
        border-radius: 20px;
        padding: 20px;
    }
}
</style>