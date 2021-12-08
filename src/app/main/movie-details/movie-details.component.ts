import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  ratedHover = 0
  faStar = faStar;
  @Input() movie:any
  @Output() updateMovie = new EventEmitter();
  
  constructor(private apiService: ApiService) { }

  rateHover(rate:number) {
    this.ratedHover=rate
  }
  rateClicked(rate:number){
    this.apiService.rateMovie(rate,this.movie.id).subscribe({
      next:result=>{
        this.getDetails()
      },
      error:error=>{
        console.log(error)
    }});
  }
  getDetails(){
    this.apiService.getMovie(this.movie.id).subscribe({
      next:movie=>{
        this.updateMovie.emit(movie);
      },
      error:error=>{
        console.log(error)
    }});
  }

}