import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseMovieUrl= 'http://127.0.0.1:8000/api/movies/'
  baseUrl= "http://127.0.0.1:8000/"
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getMovies() {
    return this.http.get(this.baseMovieUrl, {'headers': this.getAuthHeaders() });
  }
  getMovie(id:number) {
    return this.http.get(`${this.baseMovieUrl}${id}/`, {'headers': this.getAuthHeaders() });
  }

  createMovie(title:any,description:any){
    const body= {title:title,description:description}
    return this.http.post(this.baseMovieUrl,body, {'headers': this.getAuthHeaders() });
  }

  updateMovie(id:number,title:any,description:any){
    const body= {title:title,description:description}
    return this.http.put(`${this.baseMovieUrl}${id}/`,body, {'headers': this.getAuthHeaders() });
  }

  deleteMovie(id:number){
    return this.http.delete(`${this.baseMovieUrl}${id}/`, {'headers': this.getAuthHeaders() });
  }

  rateMovie(rate:number,movieId:number){
    const body= {stars:rate}
    return this.http.post(`${this.baseMovieUrl}${movieId}/rate_movie/`,body,{'headers': this.getAuthHeaders() });
  }

  loginUser(authForm:any){
    const body= JSON.stringify(authForm)
    return this.http.post(`${this.baseUrl}auth/`,body,{'headers': this.headers });
  }

  registerUser(authForm:any){
    const body= JSON.stringify(authForm)
    return this.http.post(`${this.baseUrl}api/users/`,body,{'headers': this.headers });
  }

  getAuthHeaders(){
    const mrToken= this.cookieService.get('mr-token');
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Token ${mrToken}`);
  }
}