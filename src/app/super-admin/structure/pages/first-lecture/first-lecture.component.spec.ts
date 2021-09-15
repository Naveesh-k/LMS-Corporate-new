import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLectureComponent } from './first-lecture.component';

describe('FirstLectureComponent', () => {
  let component: FirstLectureComponent;
  let fixture: ComponentFixture<FirstLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
