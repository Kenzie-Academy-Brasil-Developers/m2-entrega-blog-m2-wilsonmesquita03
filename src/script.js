import UserRequests  from "./js/controllers/userRequests.js";
import postRequests from "./js/controllers/postRequests.js"
import Post from "./js/models/post.js";


const teste = await postRequests.getPosts()

console.log(teste.data)

Post.listPosts(teste.data)