
//GET ALL USERS
export const getAllUsers = () => {
    return fetch(`${process.env.REACT_APP_API}/users`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
