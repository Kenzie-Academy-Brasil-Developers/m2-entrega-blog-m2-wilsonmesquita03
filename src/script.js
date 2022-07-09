import UserRequests  from "./js/controllers/userRequests.js";
import postRequests from "./js/controllers/postRequests.js"
import Post from "./js/models/post.js";
import ComponentesDOM from "./js/models/componentes.js";

if(localStorage.getItem("@blog-kenzie:user") == null){
    window.location = "/index.html"
}

const posts = await postRequests.getPosts()

// const posts = [{
//     content: "Olá",
//     createdAt: "2022-07-07T00:00:00.000Z",
//     id: 479,
//     updateAt: null,
//     user: {
//         id: 3651,
//         username: "Wilson",
//         avatarUrl: "#"
//     }
// }, {
//     content: "Olá",
//     createdAt: "2022-07-07T00:00:00.000Z",
//     id: 480,
//     updateAt: null,
//     user: {
//         id: 3650,
//         username: "Kop",
//         avatarUrl: "#"
//     }
// }]

Post.listPosts(posts.data)  

await ComponentesDOM.header()
await ComponentesDOM.publishPost()