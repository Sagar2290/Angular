import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomslistComponent } from './rooms-list.component';

describe('RoomslistComponent', () => {
  let component: RoomslistComponent;
  let fixture: ComponentFixture<RoomslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
