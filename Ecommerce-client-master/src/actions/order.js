

export const getAllOrders = () => {
    return fetch(`${process.env.REACT_APP_API}/order/all-orders`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
