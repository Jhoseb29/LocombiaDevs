
import { UserData } from "./UserData.js"
import { API_URL } from "./shoppingCartController.js"


export const Get = (ruta) =>{
    return fetch(API_URL + ruta).then( response =>{
        if(!response.ok){
            throw new Error("Error al obtener datos")
        }
        //* console.log(response.json())
        return response.json();
    })
}

export const CreateUser = (username, email, password) => {
    UserData.username = username;
    UserData.email = email;
    UserData.password = password;
    return fetch(API_URL + "users", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserData),
    })
    .then(response => {
        if(!response.ok){
            
            throw new Error("Error al guardar datos")
        }
    })
} 

export const FindExistingUser = (username, { email = null, password = null } = {}) => { //! el username es obligatorio , pero el email o password son obcionales , no se pueden pasar los tres parametros 
    const Users = Get('users');
    if(email!=null){ //? verificar si el usuario con el mismo email ó username || para registros
        return Users.then(UsersList => {
    
            return UsersList.find(user => user.username === username || user.email === email) || null;
        })
    }
    else if(password != null){ //? verificar si el usuario con el mismo password y username || para login
        return Users.then(UsersList => {
            
            return UsersList.find(user => user.username === username && user.password === password) || null;
        })
    }
    else{
        throw new Error("estamos trabajando");;
    }
}

export const Delete = async (id) => {
    const response = await fetch(`${API_URL}users/${id}`, {
          method: "DELETE",
      })
      if (!response.ok) {
          throw new Error("Error al eliminar el usuario")
      }
  };

