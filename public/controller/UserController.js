// Funcion de registro 

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
