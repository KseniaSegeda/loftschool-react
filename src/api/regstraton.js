export const serverLogUp = async(form) => {
    return fetch(`https://loft-taxi.glitch.me/register`, {
        method: 'POST',
        body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name,
            surname: form.lastName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}
