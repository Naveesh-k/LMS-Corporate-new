import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiseTopicComponent } from './customise-topic.component';

describe('CustomiseTopicComponent', () => {
  let component: CustomiseTopicComponent;
  let fixture: ComponentFixture<CustomiseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomiseTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
