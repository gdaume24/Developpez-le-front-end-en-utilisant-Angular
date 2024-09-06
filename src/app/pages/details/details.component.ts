import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraphicTitleComponent } from 'src/app/components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from 'src/app/components/informative-square/informative-square.component';

@Component({
  standalone: true,
  imports: [GraphicTitleComponent, InformativeSquareComponent],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  subscription!: Subscription;
  id = 0;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  nav() {
    this.location.back();
    };
}




