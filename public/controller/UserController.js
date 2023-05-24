
// Funcion de registro 
export function postUser(username, email, password) {

    const userData = {
        username: username,
        email: email,
        password: password,
    };
        console.log(userData)
        
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud de registro');
        }
        return response.json();
      });
}




