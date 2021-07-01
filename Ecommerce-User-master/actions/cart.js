
//ADD TO CART
export const addToCart = (product,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/cart/add-product`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCartProduct = (userId) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/cart/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//INCREMENT COUNT
export const incrementCountCart = (cartProductId, productId,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/cart/increment/${cartProductId}/${productId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//DECREMENT COUNT
export const decrementCountCart = (cartProductId, productId,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/cart/decrement/${cartProductId}/${productId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
