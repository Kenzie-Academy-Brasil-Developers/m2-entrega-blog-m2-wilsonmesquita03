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

        moreInfo.append(moreInfoData)

        postDetails.append(nomeDoUsuario, texto)

        li.append(avatar, postDetails, moreInfo)

        return li
    }

    static listPosts(lista){
        const ul = document.querySelector('#posts')
        ul.innerHTML = ""
        lista.forEach(item => {
            const card = this.componenteDOM(item)
            ul.appendChild(card)
        })
    }
}

function dataFormater(data){
    const dataArr = data.split('-')
    dataArr[2] = dataArr[2][0] + dataArr[2][1]

    return dataArr.join('.')
}