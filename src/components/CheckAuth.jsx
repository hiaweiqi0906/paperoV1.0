import axios from "axios"

class Auth{
    constructor(){
        this.authenticated = false
        this.haventCheck = true
    }

    login(){
        this.authenticated = true
    }

    logout(){
        this.authenticated = false
    }

    isAuthenticated(){
        // if(!this.authenticated && this.haventCheck){
        //     axios.get('http://localhost:5000/isLogin')
        // }
        console.log('here ', this.authenticated)
        return this.authenticated
    }
}

export default new Auth()