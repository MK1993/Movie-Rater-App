import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  @Input() movies:any = []
  @Output() selectedMovie = new EventEmitter();
  @Output() editedMovie = new EventEmitter();
  @Output() createNewMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter();

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  movieClicked(movie:any) {
    this.selectedMovie.emit(movie);
  }

  editMovie(movie:any) {
    this.editedMovie.emit(movie);
  }

  newMovie(){
    this.createNewMovie.emit();
  }

  deleteMovie(movie:any) {
    this.deletedMovie.emit(movie);
  }

  logout(){
    const mrToken= this.cookieService.delete('mr-token');
    this.router.navigate(['/auth'])
  }

}
