import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatePortalComponent } from './navigate-portal.component';

describe('NavigatePortalComponent', () => {
  let component: NavigatePortalComponent;
  let fixture: ComponentFixture<NavigatePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatePortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
