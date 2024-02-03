import { Component } from '@angular/core';
import { RequestHelper } from 'src/app/helpers/RequestHelper';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  username!: string;
  password!: string;

  constructor() {}

  onSubmit() {
  }




   requestHelper = new RequestHelper();
   
   onButtonPressed = async() =>{

    let resp;
    try{
      resp = await this.requestHelper.getData1("https://api.publicapis.org/entries");
      console.log(resp.data.entries);
    } catch(e){
      console.log("failed!!!");
    }
  }
}
