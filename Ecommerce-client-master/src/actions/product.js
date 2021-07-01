

//ADD PRODUCT
export const addProduct = (body,token) => {
    return fetch(`${process.env.REACT_APP_API}/product/create`, {
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


//GET PRODUCTS
export const getProduct = () => {
    return fetch(`${process.env.REACT_APP_API}/products`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// GET SINGLE PRODUCT BY ID
export const singleProduct = id => {
    return fetch(`${process.env.REACT_APP_API}/product/${id}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//DELETE SINGLE PRODUCT BY ID
export const deleteProductById = (id,token) => {
  console.log(id)
    return fetch(`${process.env.REACT_APP_API}/product/delete/${id}`, {
        method: 'DELETE',
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


//UPDATE SINGLE PRODUCT BY ID
export const updateProductById = (body,id,token) => {
    return fetch(`${process.env.REACT_APP_API}/product/${id}`, {
        method: 'PATCH',
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

//GET PRODUCT BY FILTER
export const getProductByFilter = (body) => {
    return fetch(`${process.env.REACT_APP_API}/products/search?${body}`, {
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

// SEARCH PRIDUCT
export const searchProduct = (term) => {
    return fetch(`${process.env.REACT_APP_API}/product?search=${term}`, {
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

// GET PRODUCT BY NAME
export const getproductByName = (productName) => {
    return fetch(`${process.env.REACT_APP_API}/product/searchByName/${productName}`, {
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
