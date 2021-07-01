
//CREATE ORDER
export const createOrder = (product,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/create`, {
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

//ORDER VERIFICATION
export const orderVerify = (fuck,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/verify`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fuck)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//GET ALL ORDERS OF A USER
export const allOrdersOfUser = (userId,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/user/${userId}`, {
        method: 'GET',
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
