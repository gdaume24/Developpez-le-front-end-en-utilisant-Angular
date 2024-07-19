import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeSquareComponent } from './informative-square.component';

describe('InformativeSquareComponent', () => {
  let component: InformativeSquareComponent;
  let fixture: ComponentFixture<InformativeSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformativeSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformativeSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
