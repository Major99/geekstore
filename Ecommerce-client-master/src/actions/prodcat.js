
//ADD CATEGORY
export const createProductByCategory = (body,token) => {
    return fetch(`${process.env.REACT_APP_API}/create-prod-by-cat`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getPdtCat = () => {
    return fetch(`${process.env.REACT_APP_API}/getPdtCat`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const updateProductByCatgory = (body, token) => {
    return fetch(`${process.env.REACT_APP_API}/update-prod-by-cat`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
