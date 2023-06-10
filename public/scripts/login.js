import { LoginUser} from "../controller/UserController.js"

const form = document.getElementById("formId")


form.addEventListener('submit', function (event){
    event.preventDefault(); 
    const username = document.getElementById("userId").value
    const password = document.getElementById("passId").value
    LoginUser(username,password)
    .then((user)=>{
        if(username == 'admin' && password == 'admin'){
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href= './admin.html'
        }else{
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href= './main_page.html'
        }
        
    })
    .catch((error)=> {
        document.getElementById("userId").value = ""
        document.getElementById("passId").value = ""
    })
})
