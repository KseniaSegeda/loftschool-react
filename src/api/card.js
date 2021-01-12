export const serverSetCard = async(form) => {
    return fetch(`https://loft-taxi.glitch.me/card`, {
        method: 'POST',
        body: JSON.stringify({
            cardNumber: form.cardNumber,
            expiryDate: form.expiryDate,
            cardName: form.cardName,
            cvc: form.cvc,
            token: ''
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const serverGetCard = async(token) => {
    return fetch(`https://loft-taxi.glitch.me/card?${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}
