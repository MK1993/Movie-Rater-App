import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies:any = []
  selectedMovie = null
  editedMovie:any
  
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mrToken= this.cookieService.get('mr-token');
    if(!mrToken){
      this.router.navigate(['/auth'])
    }
    else {
      this.apiService.getMovies().subscribe({
        next:data=>{
          this.movies = data
        },
        error:error=>{
          console.log(error)
      }});
    }
  }

  movieClicked(movie: any) {
    this.selectedMovie=movie
    this.editedMovie=null
  }

  editMovie(movie: any) {
    this.editedMovie=movie
    this.selectedMovie=null
  }

  createNewMovie(){
    this.editedMovie= {title:'',description:''}
    this.selectedMovie= null
  }
  
  deletedMovie(movie: any) {
    this.apiService.deleteMovie(movie.id).subscribe({
      next: data=>{
        const newMovies=[]
        for(let num=0;num<this.movies.length;num++){
          if(this.movies[num].id !== movie.id){
            newMovies.push(this.movies[num])
          }
        }
        this.movies=newMovies
      },
      error: error=>{
        console.log(error)
    }});
  }

  movieCreated(movie:any) {
    this.movies.push(movie)
    this.editedMovie=null
  }

  movieUpdated(movie:any){
    for(let num=0;num<this.movies.length;num++){
      if(this.movies[num].id === movie.id){
        this.movies[num]=movie
      }
    }
    this.editedMovie=null
  }
}
