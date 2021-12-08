import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  movieForm:any
  id=null

  @Input() set movie(val:any){
    this.id=val.id
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description),
    });
  }
  @Output() movieCreated= new EventEmitter()
  @Output() movieUpdated= new EventEmitter()

  
  constructor(private apiService: ApiService) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(this.id){
      this.apiService.updateMovie(this.id,this.movieForm.value.title,this.movieForm.value.description)
      .subscribe({
        next: result=>{
          this.movieUpdated.emit(result)
        },
        error: error=>{
          console.log(error)
      }});
    } else {
      this.apiService.createMovie(this.movieForm.value.title,this.movieForm.value.description)
      .subscribe({
        next: result=>{
          this.movieCreated.emit(result)
        },
        error: error=>{
          console.log(error)
      }});
    }
  }

  formDisabled() {
    if(this.movieForm.value.title.length && this.movieForm.value.description.length){
      return false
    } else {
      return true
    }
  }

}
