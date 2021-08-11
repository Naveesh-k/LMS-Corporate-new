import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashVarComponent } from './dash-var.component';

describe('DashVarComponent', () => {
  let component: DashVarComponent;
  let fixture: ComponentFixture<DashVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashVarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
