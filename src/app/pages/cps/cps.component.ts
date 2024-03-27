import { Component } from '@angular/core';

@Component({
  selector: 'app-cps',
  standalone: true,
  imports: [],
  templateUrl: './cps.component.html',
  styleUrl: './cps.component.scss',
})
export class CpsComponent {
  score: number = 0;
  timerDuration: number = 5;
  timerTotal: string = '0';
  clickSpeed: string = '0';
  gameActiv: boolean = false;
  gameEnded: boolean = false;
  hideGamePopUp: boolean = false;
  popUpCloseable: boolean = false;

  startCps() {
    if (this.gameEnded == true) {
      this.reset();
      return;
    }
    this.clickCount();
    if (this.gameActiv === false) {
      this.startTimer();
    }
  }

  clickCount() {
    this.score++;
  }

  startTimer() {
    this.gameActiv = true;
    var startTime = new Date().getTime();

    var timer = setInterval((): any => {
      var total = (new Date().getTime() - startTime) / 1000;

      if (total < this.timerDuration) {
        this.timerTotal = total.toFixed(2);
        this.clickSpeed = (this.score / total).toFixed(2);
      } else {
        this.gameActiv = false;
        this.gameEnded = true;
        setTimeout(() => {
          this.popUpCloseable = true;
        }, 1500);
        clearInterval(timer);
      }
    }, 1);
  }

  reset(): any {
    if (this.popUpCloseable == false) {
      return;
    }
    this.score = 0;
    this.timerTotal = '0.00';
    this.clickSpeed = '0.00';
    this.gameActiv = false;
    this.gameEnded = false;
  }

  resetBg() {
    if (this.popUpCloseable == false) {
      return;
    }
    this.hideGamePopUp = true;
  }
}
