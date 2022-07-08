export default class postRequests {
    static base_url = "https://blog-m2.herokuapp.com"

    static async getPosts(){
        return fetch(this.base_url + "/posts?page=1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@blog-kenzie:token")}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
    static async getPostByID(id){
        return fetch(this.base_url + `/posts/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@blog-kenzie:token")}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
    static async newPost(data){
        return fetch(this.base_url + "/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@blog-kenzie:token")}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
}