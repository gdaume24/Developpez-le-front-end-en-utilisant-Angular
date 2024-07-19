import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-title',
  standalone: true,
  imports: [],
  templateUrl: './graphic-title.component.html',
  styleUrl: './graphic-title.component.scss'
})
export class GraphicTitleComponent {
  @Input() title!: string
}
