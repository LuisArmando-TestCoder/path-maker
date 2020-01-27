import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneTravelerCanvasComponent } from './zone-traveler-canvas.component';

describe('ZoneTravelerCanvasComponent', () => {
  let component: ZoneTravelerCanvasComponent;
  let fixture: ComponentFixture<ZoneTravelerCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneTravelerCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneTravelerCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
