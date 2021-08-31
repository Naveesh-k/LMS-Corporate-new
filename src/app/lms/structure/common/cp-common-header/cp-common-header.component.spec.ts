import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpCommonHeaderComponent } from './cp-common-header.component';

describe('CpCommonHeaderComponent', () => {
  let component: CpCommonHeaderComponent;
  let fixture: ComponentFixture<CpCommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpCommonHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
