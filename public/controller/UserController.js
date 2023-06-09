// Funcion de registro 

const API_URL = "http://localhost:3000/"

import { CreateUser, FindExistingUser } from "./UserApi.js";
import { ValidationUser } from "../scripts/validationFormRegister.js";
import { ValidateLogin } from "../scripts/validationFormLogin.js";

export const RegisterUser = async (user, emailhtml, password) =>{
  const username = user.value
  const email = emailhtml.value
  const existingUser = await FindExistingUser(username, {email:email});
  if(existingUser != null){
    ValidationUser(user,emailhtml);
    throw new Error('El nombre de usuario o el correo electrónico ya están en uso');
  }
  else{
    CreateUser(username, email, password)
  }
}

export const LoginUser = async(username, password) =>{
  const existingUser = await FindExistingUser(username, {password:password});
  if(existingUser == null){
    ValidateLogin(true)
    throw new Error("Invalid Credentials")
  }
  else {
    ValidateLogin(false)
    return existingUser
  }
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

  


