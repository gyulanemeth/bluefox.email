export default () => {

    async function verifySubscription(token) {
        const response = await fetch(import.meta.env.VITE_BLUEFOX_URL + '/v1/waitlist/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const res = await response.json()
        if (res.status !== 200) {
            const error = new Error(res.error.message)
            error.status = res.status
            error.name = res.error.name
            throw error
        }
        return res
    }

    async function subscribe(formData) {
        const response = await fetch(import.meta.env.VITE_BLUEFOX_URL + '/v1/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email
            })
        })
        const res = await response.json()
        if (res.status !== 201) {
            const error = new Error(res.error.message)
            error.status = res.status
            error.name = res.error.name
            throw error
        }
        return res
    }
    return {
        subscribe,
        verifySubscription
    }
}
