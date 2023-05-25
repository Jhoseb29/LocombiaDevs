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
        //console.log(response.json())
        return response.json()
    })
    .then((data) => {
        const user = data.find(user => user.username === username && user.password === password); 
        if (user) { 
            return user;
        }
        else{
            throw new Error('Credenciales inválidas');
        }
    })
    
}
    
/*

function getPassword(password){
     
    return fetch('http://localhost:3000/users?password='+password, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }})
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{
        console.log(data)
        const user = data.find(user => user.password === password)
        return user.password  
    })    

} 
*/


//User validation


        /*



    if(usernameDb.lenght == 0 && passwordDb.lenght == 0){ 
        alert("user doesn't exist")
        
    }else if(usernameDb.lenght == 1 && passwordDb.lenght == 0 ){
        alert("password it's not related with this username. Please try again")
    }else if(usernameDb.lenght == 0 && passwordDb > 1){
        alert("Username it's not related with this password. Please try again")
    }

    })*/


