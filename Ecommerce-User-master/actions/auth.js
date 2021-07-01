import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from 'next/router';


//SEESION IS EXPIRE
export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your session is expired. Please signin'
                }
            });
        });
    }
};


//PRE SIGNUP
export const activateAccount = user => {
  console.log(user)
    return fetch(`${process.env.NEXT_PUBLIC_API}/account-activation`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//SIGN UP
export const signup = user => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//SIGN IN
export const signin = user => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//SIGN OUT
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${process.env.NEXT_PUBLIC_API}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success');
        })
        .catch(err => console.log(err));
};


//SET COOKIE
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};


//REMOVE COOKIE
export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};


//GET COOKIE
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};


//SET IN LOCALSTORAGE
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};


//REMOVE FROM LOCALSTORAGE
export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};


//AUTHENTICATE USER BY PASS DATA TO COOKIE AND LOCALSTORAGE
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};


//CHECK USER IS AUTHENTICATE OR NOT
export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};


//UPDATE USER
export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
};


//FORGOT PASSWORD
export const forgotPassword = email => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/forgot-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//RESET PASSWORD
export const resetPassword = resetInfo => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const userProfile = (userId,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
        method: 'GET',
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



export const updateProfile = (user, token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/user/profile`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
