import postRequests from "../controllers/postRequests.js"

export default class Post {
    static componenteDOM(post){
        const {content, createdAt, id, user} = post

        const li = document.createElement('li')

        const avatar = document.createElement('img')
        avatar.classList.add('post__image')
        avatar.src = user.avatarUrl

        avatar.onerror = () => {
          avatar.src = "../../../assets/img/avatarDefault.png"
        }

        const postDetails = document.createElement('div')
        postDetails.classList.add("post__details")
        

        const nomeDoUsuario = document.createElement('h1')
        nomeDoUsuario.innerText = user.username

        const texto = document.createElement('span')
        texto.innerText = content
        
        const moreInfo = document.createElement('div')
        moreInfo.classList.add("post__moreInfo")
        
        const moreInfoData = document.createElement('span')
        moreInfoData.innerText = dataFormater(createdAt)
        moreInfoData.classList.add("moreInfo__data")

        const textArea = document.createElement("textarea")

        moreInfo.append(moreInfoData)

        if(user.id == localStorage.getItem("@blog-kenzie:user")){
            const buttonDelet = document.createElement('button')
            buttonDelet.innerText = "Apagar"
            buttonDelet.classList.add("button" , "post__button", "post__button--theme-red")
            buttonDelet.id = id

            buttonDelet.addEventListener("click", async () => {
                li.remove()
                await postRequests.deletePost(buttonDelet.id)
            })

            const buttonEdit = document.createElement('button')
            buttonEdit.innerText = "Editar"
            buttonEdit.classList.add("button" , "post__button", "post__button--theme-blue")
            buttonEdit.id = id

            buttonEdit.addEventListener("click", async () => {

                if(postDetails.lastChild.tagName !== "TEXTAREA"){
                    textArea.innerText = texto.innerText
                    texto.style.display = "none"
                    postDetails.append(textArea)
                }else {
                    if(textArea.value !== ""){
                        texto.innerText = textArea.value
                        postDetails.removeChild(textArea)
                        texto.style.display = "flex"

                        const data = {
                            content: texto.innerText
                        }

                        await postRequests.editPost(buttonEdit.id, data)
                    }
                }  
            })

            moreInfo.append(buttonDelet, buttonEdit)
        }

        postDetails.append(nomeDoUsuario, texto)

        li.append(avatar, postDetails, moreInfo)

        return li
    }

    static listPosts(lista){
        const ul = document.querySelector('#posts')
        ul.innerHTML = ""
        
        if(lista instanceof Array){
            lista.forEach(item => {
                const card = this.componenteDOM(item)
                ul.appendChild(card)
            })
        }
    }
}

function dataFormater(data){
    const dataArr = data.split('-')
    dataArr[2] = dataArr[2][0] + dataArr[2][1]

    return dataArr.join('.')
}