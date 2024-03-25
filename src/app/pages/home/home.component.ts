import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  text: string[] = ['Hey, my name is Lukas', 'Hey, mein Name ist Lukas'];
  color: string[] = ['#FAF9F6'];
  currentIndex: number = 0;
  sleepTime: number = 100;

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async loop() {
    const elementText = document.getElementById('typewriter');
    const elementCursor = document.getElementById('cursor');

    if (!elementText || !elementCursor) {
      return;
    }

    elementCursor.classList.add('idle');

    await this.sleep(this.sleepTime * 20);

    elementCursor.classList.remove('idle');

    while (true) {
      let curWord = this.text[this.currentIndex];
      elementText.style.color = this.color[this.currentIndex];

      //typing
      for (let i = 0; i < curWord.length; i++) {
        elementText.innerText = curWord.substring(0, i + 1);
        await this.sleep(this.sleepTime);
      }

      elementCursor.classList.add('idle');

      await this.sleep(this.sleepTime * 35);

      elementCursor.classList.remove('idle');

      //remover
      for (let i = curWord.length; i > 0; i--) {
        elementText.innerText = curWord.substring(0, i - 1);
        await this.sleep(this.sleepTime - 50);
      }

      elementCursor.classList.add('idle');

      await this.sleep(this.sleepTime * 20);

      elementCursor.classList.remove('idle');

      if (this.currentIndex === this.text.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }
  }

  ngAfterViewInit(): void {
    this.loop();
  }
}
