// Funcion de registro 
export function postUser(username, email, password) {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
  
    // Realizar una solicitud GET para verificar si las credenciales ya existen
    return fetch('http://localhost:3000/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
          throw new Error('El nombre de usuario o el correo electrónico ya están en uso');
        } else {
          // Si las credenciales no existen, realizar la solicitud POST de registro
          return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          })
            .then(response => {
              
              return response.json();
            });
        }
      });
}

//Function Get User
export function loginValidation(username, password){
     
    return fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }})
    .then((response) =>{
        return response.json()
    })
    .then((data) => {

        const user = data.find(user => user.username === username && user.password === password); 
        if (user) { 
            return user;
        }
        else{
            throw new Error("Invalid Credentials");
        }
    })
    
}


  


