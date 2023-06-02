import { LoginUser} from "../controller/UserController.js"

const form = document.getElementById("formId")


form.addEventListener('submit', function (event){
    event.preventDefault(); 
    const username = document.getElementById("userId").value
    const password = document.getElementById("passId").value
    LoginUser(username,password)
    .then(()=>{
        window.location.href= '../index.html'
    })
    .catch((error)=> {
        document.getElementById("userId").value = ""
        document.getElementById("passId").value = ""
    })
})
