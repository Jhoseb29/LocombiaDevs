const API_URL = "http://localhost:3000/"

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



export const UpdateUserForm = async (userId, username, email, password) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser.password !== password) {
    return Promise.reject(new Error('Contraseña incorrecta. No se pueden realizar los cambios'));
  }

  // Obtener la información actual del usuario desde el archivo db.json
  const response = await fetch(API_URL + "users/" + userId);
  if (!response.ok) {
    throw new Error("Error al obtener la información del usuario");
  }
  const userData = await response.json();
  // Actualizar los campos solo si se proporcionaron valores en el formulario
  if (username !== '') {
    userData.username = username;
  }
  if (email !== '') {
    userData.email = email;
  }
  if (password !== '') {
    userData.password = password;
  }
  const response_1 = await fetch(API_URL + "users/" + userId, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response_1.ok) {
    throw new Error("Error al actualizar el usuario");
  }
};

  


