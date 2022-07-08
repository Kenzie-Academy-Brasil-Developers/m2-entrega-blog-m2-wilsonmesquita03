import ComponentesDOM from "../models/componentes.js"
import UserRequests from "../controllers/userRequests.js"

if(localStorage.getItem("@blog-kenzie:user") == null){
    ComponentesDOM.login()
}else{
    window.location = "./src/js/pages/blog.html"
}