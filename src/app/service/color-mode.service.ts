import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorModeService {
  private colorSource = new BehaviorSubject(
    localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'
  );
  currentMode = this.colorSource.asObservable();

  changeMode(message: string) {
    this.colorSource.next(message);
  }
}
