


//ADD CATEGORY
export const addCategory = (body,token) => {
    return fetch(`${process.env.REACT_APP_API}/category/create`, {
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


//GET  CATEGORY
export const getCategory = () => {
    return fetch(`${process.env.REACT_APP_API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// GET SINGLE CATEGORY BY ID
export const singleCategory = id => {
    return fetch(`${process.env.REACT_APP_API}/category/${id}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//DELETE SINGLE CATEGORY BY ID
export const deleteCategoryById = (id,token) => {

    return fetch(`${process.env.REACT_APP_API}/category/delete/${id}`, {
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


//UPDATE SINGLE CATEGORY BY ID
export const updateCategoryById = (body,id,token) => {
    return fetch(`${process.env.REACT_APP_API}/category/${id}`, {
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
