import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneTravelerComponent } from './zone-traveler.component';

describe('ZoneTravelerComponent', () => {
  let component: ZoneTravelerComponent;
  let fixture: ComponentFixture<ZoneTravelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneTravelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
