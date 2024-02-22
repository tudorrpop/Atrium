import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {

  user: User | undefined;

  constructor(private userService: UserService,
    private cookieService: CookieService){

      this.userService.getUser(cookieService.get('email')).subscribe(
        (response: User) => {
          this.user = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      
  }

}
