import { Component } from '@angular/core';

@Component({
  selector: 'app-cps',
  standalone: true,
  imports: [],
  templateUrl: './cps.component.html',
  styleUrl: './cps.component.scss',
})
export class CpsComponent {
  count: number = 0;
  countdown: number = 500;
  timer: any;
  timerActiv: boolean = false;

  startCps() {
    this.clickCount();
    this.startTimer();
  }

  clickCount(): void {
    this.count++;
  }

  startTimer() {
    if (this.timerActiv == true) {
      return;
    }
    this.timerActiv = true;
    this.countdown = 500;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.timer);
      }
    }, 10);
  }

  cps(): any {
    var Calcualtion = this.count / 5
    //if (this.timerActiv == true)
    return Calcualtion;
  }

  reset(): any {
    this.count = 0 
    this.countdown = 500
    this.timerActiv = false
    
    
  } 
}
