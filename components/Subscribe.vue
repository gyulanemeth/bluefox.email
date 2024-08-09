<script setup>
import { ref } from 'vue'
import bluefoxEmailApiConnectors from '../connectors/bluefoxEmailApi.js'


const form = ref({
    name: '',
    email: '',
    human: false,
})
const validation = ref({
    name: false,
    email: false,
})

const submitted = ref(false)
const error = ref(false)
const verified = ref(false)

const submitForm = async () => {
    const { name, email } = form.value
    validation.value.name = !name
    validation.value.email = !email
    if (validation.value.email || validation.value.name) {
        return false
    }
    try {
        await bluefoxEmailApiConnectors().subscribe({ name: form.value.name, email: form.value.email })
        submitted.value = true
    } catch (err) {
        error.value = true
    }
    setTimeout(() => {
        submitted.value = false;
        error.value = false;
    }, 10000);
}


const token = new URLSearchParams(window.location.search).get('token')
if (token) {
    const url = new URL(window.location);
    url.searchParams.delete('token');
    history.replaceState(null, '', url.pathname + url.search);
    try {
        await bluefoxEmailApiConnectors().verifySubscription(token)
        verified.value = true
    } catch (err) {
        error.value = true
    }
    setTimeout(() => {
        verified.value = false;
        error.value = false;
    }, 10000);
}
</script>

<template>
    <section id="subscribe" class="custom-section">
        <h1 class="header">Join Waitlist</h1>
        <form class="form" v-if="!submitted && !error" @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" class="outlined-input" />
                <span class="validation" v-if="validation.name">please enter your name</span>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" class="outlined-input" />
                <span class="validation" v-if="validation.email">please enter your email</span>
            </div>
            <div class="form-group-inline">
                <input type="checkbox" id="human" v-model="form.human" class="checkbox" />
                <label for="human" class="checkbox-label">I'm a human</label>
            </div>
            <div class="form-group-inline">
                <button :disabled="!form.human" type="submit" class="submit-btn">Submit</button>
            </div>
        </form>
        <div v-else-if="submitted" class="callback-section">
            <p>
                <span class="callback-msg">
                    Verify your email address,
                </span>
                Check your inbox for an email from us containing a verification link. Click on the link to confirm your
                email and gain full access to our application.
            </p>
        </div>
        <div v-else-if="verified" class="callback-section">
            <p>
                <span class="callback-msg">
                    Email Verified Successfully,
                </span>
                Congratulations! You have successfully verified your email address
            </p>
        </div>
        <div v-else-if="error" class="callback-section">
            <p>
                <span class="callback-msg">
                    Something went wrong,
                </span>
                An unexpected error has occurred. Please try again later. If the issue continues, don't hesitate to
                reach out to our support team.
            </p>
        </div>
    </section>
</template>


<style scoped>
.custom-section {
    width: 60.5%;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #f6f6f7;
    background: #f6f6f7;
    border-radius: 10px;
}

.checkbox {
    margin-right: 8px;
    width: 20px;
    height: 20px;
}

.checkbox-label {
    margin-top: 3px;
}

.callback-section {
    padding: 20px;
}

.callback-msg {
    font-size: 18px;
    font-weight: bold;
}

.header {
    margin-bottom: 50px;
    margin-top: 60px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
}

:root.dark .custom-section {
    border: 1px solid #252529;
    background: #252529;
}

.form {
    width: 50%;
    margin: auto;
}

.form-group {
    margin-bottom: 20px;
}

.form-group-inline {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.outlined-input {
    width: 100%;
    padding: 8px;
    border: 2px solid #cacaca;
    background-color: #cacaca;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    outline: none;
}

:root.dark .outlined-input {
    border: 2px solid #52525952;
    background-color: #52525952;
}

.outlined-input:focus {
    border-color: #007bff;
}

.submit-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    background-color: rgb(17, 176, 238);
    color: white;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    border-radius: 20px;
    margin: auto;
}

.submit-btn:hover:enabled {
    background-color: rgb(11, 135, 184);
}

.submit-btn:disabled {
    cursor: not-allowed;
    background-color: #ccc;
}

.validation {
    color: rgb(190, 72, 72);
    font-size: 0.7rem;
}
</style>