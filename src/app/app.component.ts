import {Component} from '@angular/core';
import { ImagesPixabayService } from './Services/images-pixabay.service';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./Components/nav/nav.component";
import { CommonModule } from '@angular/common';
import { PhotoComponent } from "./Components/photo/photo.component";
import {  DataImage } from "./Interfaces/dataImage"
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, CommonModule, PhotoComponent, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'home';
  
  pixabayData: DataImage[] = []
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  currentPage: number = 1;

  constructor( private imagesPixabayService: ImagesPixabayService ){
  }

  ngOnInit(){
    this.loadImages();
  }


  loadImages(){
    this.loading = true;
    this.error = null;
    this.imagesPixabayService.getAllImages(this.currentPage).subscribe(
      {
        next: (response) => {
          this.pixabayData = response.data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      }
    );
  }



  searchImages(reset : boolean) {
    this.loading = true;
    this.error = null;
    if(reset) this.currentPage = 1
    console.log(this.searchQuery, "hola")
    this.imagesPixabayService.searchImages(this.searchQuery, this.currentPage).subscribe({
      next: (response) => {
        this.pixabayData = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }



  nextPage() {
    this.currentPage++;
    if(this.searchQuery.trim() !== ''){
     this.searchImages(false);
    }  
    else this.loadImages();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if(this.searchQuery.trim() !== '') this.searchImages(false);
      else this.loadImages();
    }
  }
}
