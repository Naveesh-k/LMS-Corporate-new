import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSignUpComponent } from './cp-sign-up.component';

describe('CpSignUpComponent', () => {
  let component: CpSignUpComponent;
  let fixture: ComponentFixture<CpSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
