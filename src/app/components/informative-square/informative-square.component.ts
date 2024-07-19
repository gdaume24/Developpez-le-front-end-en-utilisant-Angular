import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informative-square',
  standalone: true,
  imports: [],
  templateUrl: './informative-square.component.html',
  styleUrl: './informative-square.component.scss'
})
export class InformativeSquareComponent {
  @Input() header!: string;
  @Input() number!: number
}
