export const serverGetAddress = async() => {
    return fetch(`https://loft-taxi.glitch.me/addressList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const serverGetRoute = async (fromRoute, toRoute) => {
    return fetch(`https://loft-taxi.glitch.me/route?address1=${fromRoute}&address2=${toRoute}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}
