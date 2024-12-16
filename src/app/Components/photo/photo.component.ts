import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
  standalone: true,
})
export class PhotoComponent {
  @Input() photo : any
}
