/* 
* Authentication actions
*/
export const FETCH_USER = 'FETCH_USER';
export function fetchUser() {
  return {
    type: FETCH_USER
  };
}

export const RECEIVE_USER = 'RECEIVE_USER';
export function receiveUser(user, jwt) {
  if (jwt) {
    localStorage.setItem('jwt', jwt);
  } else {
    localStorage.removeItem('jwt');
  }

  return {
    type: RECEIVE_USER,
    user,
    jwt
  };
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function logoutUser() {
  localStorage.removeItem('jwt');

  return {
    type: LOGOUT_USER
  };
}

/*
* We wrap this function in a promise because the app needs to know when this is completed
* in order to render the rest of the application. It waits for the user to be loaded, so that
* way it knows what routes can be shown. All other things can wait to be downloaded because they
* aren't critical to the function of the application. This is the only exception to that.
*/
export function initializeUser() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem('jwt');

      if (jwt != null) {
        dispatch(fetchUser());

        return fetch('http://localhost:3000/@me', {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
          .then(response => response.json(), error => console.error(error))
          .then(json => {
            if (json.success) {
              dispatch(receiveUser(json.user, jwt));
            } else {
              dispatch(receiveUser(null, null));
            }

            resolve();
          })
      } else {
        dispatch(receiveUser(null, null));
        resolve();
      }
    });
  }  
}

export function signupUser(user) {
  return function(dispatch) {
    dispatch(fetchUser());

    return fetch('http://localhost:3000/user/create', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json(), error => console.error(error))
      .then(json => {
        if (json.success) return dispatch(receiveUser(json.user, json.jwt));
      });
  }
}

export function signinUser(user) {
  return function(dispatch) {
    dispatch(fetchUser());

    return fetch('http://localhost:3000/user/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json(), error => console.error(error))
      .then(json => {
        if (json.success) return dispatch(receiveUser(json.user, json.jwt));
      });
  }
}