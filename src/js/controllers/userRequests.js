export default class UserRequests {
    static base_url = "https://blog-m2.herokuapp.com"

    static async register(data){
        return await fetch(this.base_url + "/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
    static async login(data){
        return await fetch(this.base_url + "/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("@blog-kenzie:user", res.userId)
            localStorage.setItem("@blog-kenzie:token", res.token)
        })
        .catch(err => console.log(err))
    }

    static async getUserByID(id){
        return await fetch(this.base_url + `/users/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@blog-kenzie:token")}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
}