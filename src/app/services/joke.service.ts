import { toPromise } from "rxjs/operator/toPromise"
import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Http, Headers, RequestOptions} from "@angular/http";
import {CONFIG} from "../config/config";
import {User} from "../classes/user";

@Injectable()
export class JokeService {

    private headers: Headers;

    constructor(
        private authService: AuthService,
        private http: Http,
    ) {

        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`});

    }

  createJoke(joke: any): Promise<any>{
      let url = `${CONFIG.API_URL}/jokes`;
      let body = { title: joke.title, joke: joke.content };
      let option = new RequestOptions({ headers: this.headers});


      return this.http.post(url, body, option )
          .toPromise()
          .then(response => {
              return response.json().data;
          });
  }

  updateJoke(id: number, joke): Promise<any>{

      let url = `${CONFIG.API_URL}/jokes/${id}`;
      let body = { title: joke.title, joke: joke.content };
      let option = new RequestOptions({ headers: this.headers});


      return this.http.put(url, body, option )
          .toPromise()
          .then(response => {
              // console.log(response);
              return response.json();
          });
  }

  deleteJoke(id: number): Promise<any>{
      let url = `${CONFIG.API_URL}/jokes/${id}`;
      let option = new RequestOptions({ headers: this.headers});

      return this.http.delete(url, option )
          .toPromise()
          .then(response => {
              // console.log(response);
              return response.json();
          });
  }

  getJokes(endPoint = null): Promise<any>{
        let url ;
            if (endPoint){
                url  = endPoint;
            } else {
                url = `${CONFIG.API_URL}/jokes`;
            }
        let option = new RequestOptions({ headers: this.headers});

        return this.http.get(url, option )
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

}
