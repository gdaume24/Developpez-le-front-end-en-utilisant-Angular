import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTitleComponent } from './graphic-title.component';

describe('GraphicTitleComponent', () => {
  let component: GraphicTitleComponent;
  let fixture: ComponentFixture<GraphicTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
