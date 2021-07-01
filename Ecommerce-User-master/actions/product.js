import fetch from 'isomorphic-fetch';

export const homepageProducts = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/get-prod-by-cat`, {
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

export const getProductBySlug = (slug) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/product/searchBySlug/${slug}`, {
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

export const searchProduct = (term) => {
  console.log(term)
    return fetch(`${process.env.NEXT_PUBLIC_API}/product?search=${term}`, {
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



export const productById = (id) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/product/${id}`, {
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


// LIST OF RELATED PRODUCTS
export const listRelatedProducts = product => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/products/related/${product._id}/${product.category}`, {
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
