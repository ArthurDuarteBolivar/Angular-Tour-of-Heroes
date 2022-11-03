import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowBackComponent } from './arrow-back.component';

describe('ArrowBackComponent', () => {
  let component: ArrowBackComponent;
  let fixture: ComponentFixture<ArrowBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
