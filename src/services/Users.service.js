import axiosClient from "../axios-client";


class UsersService{
    constructor(){
        this.api = "/users"
        this.client = axiosClient
    }

    

}

export default new UsersService();