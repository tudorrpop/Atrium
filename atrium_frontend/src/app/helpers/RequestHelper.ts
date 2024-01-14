import axios from "axios";
export class RequestHelper {

    private baseUrl:string = "";
    RequestHelper(baserUrl:string){
        this.baseUrl = baserUrl
    }

    getData1(url:string){
        return axios.get(url)
    }
}