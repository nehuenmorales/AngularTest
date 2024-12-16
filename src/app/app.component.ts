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

  constructor( private imagesPixabayService: ImagesPixabayService ){
  }

  ngOnInit(){
    this.loadImages();
  }


  loadImages(){
    this.loading = true;
    this.error = null;

    this.imagesPixabayService.getAllImages().subscribe(
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



  searchImages() {
    this.loading = true;
    this.error = null;

    this.imagesPixabayService.searchImages(this.searchQuery).subscribe({
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
}
