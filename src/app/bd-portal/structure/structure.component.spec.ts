import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StructureComponent } from './structure.component';

describe('StructureComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StructureComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StructureComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lms'`, () => {
    const fixture = TestBed.createComponent(StructureComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lms');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StructureComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'lms app is running!'
    );
  });
});
