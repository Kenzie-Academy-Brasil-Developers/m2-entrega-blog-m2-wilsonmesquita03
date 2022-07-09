import postRequests from "../controllers/postRequests.js"
import UserRequests from "../controllers/userRequests.js"
import Post from "./post.js"

export default class ComponentesDOM {
    static main = document.querySelector('main')

    static login(){
        this.main.innerHTML = ''

        const form = document.createElement('form')

        const div = document.createElement('div')
        div.classList.add("header")

        const h1 = document.createElement('h1')
        h1.innerText = "Login"

        div.append(h1)

        const inputEmail = document.createElement('input')
        inputEmail.placeholder = "Email"
        inputEmail.type = "email"
        
        const inputPassword = document.createElement('input')
        inputPassword.placeholder = "Senha"
        inputPassword.type = "password"

        const inputSubmit = document.createElement('input')
        inputSubmit.classList.add("button", "button__submit", "button--theme-orange")
        inputSubmit.value = "Login"
        inputSubmit.id = "submit"
        inputSubmit.type = "submit"
        inputSubmit.name = "submit"

        const buttonNotRegistred = document.createElement('button')
        buttonNotRegistred.innerText = "Ainda não tem uma conta?"
        buttonNotRegistred.classList.add('button', "register")

        buttonNotRegistred.addEventListener("click", (event) => {
            event.preventDefault()
            this.register()
        })
        
        form.append(div, inputEmail, inputPassword, inputSubmit, buttonNotRegistred)

        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const email = event.target[0].value
            const password = event.target[1].value

            const data = {email, password}

            await UserRequests.login(data)

            window.location.reload()
        })

        this.main.append(form)
    }

    static register(){
        this.main.innerHTML = ''
        const form = document.createElement('form')

        const div = document.createElement('div')
        div.classList.add("header")

        const h1 = document.createElement('h1')
        h1.innerText = "Registro"

        div.appendChild(h1)

        const inputUser = document.createElement('input')
        inputUser.type = "text"
        inputUser.placeholder = "Nome de usuário"

        const inputEmail = document.createElement('input')
        inputEmail.type = "email"
        inputEmail.placeholder = "Email"

        const inputPhoto = document.createElement('input')
        inputPhoto.type = "text"
        inputPhoto.placeholder = "Foto de perfil"

        const inputPassword = document.createElement('input')
        inputPassword.type = "password"
        inputPassword.placeholder = "Senha"

        const inputSubmit = document.createElement('input')
        inputSubmit.type = "submit"
        inputSubmit.value = "Cadastrar"
        inputSubmit.classList.add("button", "button__submit", "button--theme-orange")


        const buttonRegistred = document.createElement('button')
        buttonRegistred.innerText = "Já tem uma conta?"
        buttonRegistred.classList.add('button', "register")

        buttonRegistred.addEventListener("click", (event) => {
            this.login()
        })


        form.append(div, inputUser, inputEmail, inputPhoto, inputPassword, inputSubmit, buttonRegistred)

        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const username = event.target[0].value
            const email = event.target[1].value
            const avatarUrl = event.target[2].value
            const password = event.target[3].value

            const data = {username, email, avatarUrl, password}

            await UserRequests.register(data)
            this.login()
        })
        
        this.main.append(form)
    }
    static async header() {
        const user = await UserRequests.getUserByID(localStorage.getItem("@blog-kenzie:user"))

        const userName = document.querySelector('.userInfo__name')
        userName.innerText = user.username

        const userAvatar = document.querySelector(".userInfo__avatar")
        userAvatar.src = user.avatarUrl

        userAvatar.onerror = () => {
            userAvatar.src = "../../../assets/img/avatarDefault.png"
          }
        
        const buttonLogout = document.querySelector('#buttonLogout')
        buttonLogout.addEventListener("click", () => {
            localStorage.clear()
            window.location.reload()
        })
    }
    static publishPost(){
        const texto = document.querySelector('.textPost')

        const publishButton = document.querySelector('#publish')

        publishButton.addEventListener('click', async () => {
            const data = {
                content: texto.value
            }
            await postRequests.newPost(data)
            texto.value = ""

            const posts = await postRequests.getPosts()

            Post.listPosts(posts.data)    
        })
    }
}
