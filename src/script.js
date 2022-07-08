import UserRequests  from "./js/controllers/userRequests.js";
import postRequests from "./js/controllers/postRequests.js"
import Post from "./js/models/post.js";
import ComponentesDOM from "./js/models/componentes.js";

if(localStorage.getItem("@blog-kenzie:user") == null){
    window.location = "/index.html"
}

const posts = await postRequests.getPosts()

Post.listPosts(posts.data)

await ComponentesDOM.header()
await ComponentesDOM.publishPost()