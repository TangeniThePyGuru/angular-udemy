import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { Http } from '@angular/http';
import { Router} from "@angular/router";
import {User} from "../classes/user"
import {UserdData} from "../classes/UserData";

@Injectable()
export class AuthService{

    constructor(
       private http: Http,
       private router: Router
    ){

    }

    register(name: string, email: string, password: string): Promise<UserdData>{
           const user = { name: name, email: email, password: password };
        return this.http.post(`${CONFIG.API_URL}/register`, user)
                .toPromise()
                .then((response) => {
                    let token = response.json().token;
                    let user = response.json().user.data;
                    let userData = new UserdData(token, user);

                    return userData;
                }, (error) => {
                    // console.log(error)
                    return error;
                });
    }

    logUserIn(userData: UserdData): void{
        localStorage.setItem('token', userData.token);

        localStorage.setItem('user', JSON.stringify(userData.user));

        this.router.navigate(['dashboard']);
    }
}