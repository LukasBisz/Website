import { Component, OnInit, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent implements OnInit {
  ngOnInit(): void {
    this.chooseBeginner();
  }

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  randomNum(max: number, min: number): number {
    var random = Math.random() * (max - min) + min;
    var number = Math.floor(random);
    return number;
  }

  chooseBeginner() {
    const beginner = this.randomNum(0, 2);
    if (beginner === 1) {
      this.easyAi();
    } else return;
  }

  clickTile(x: number, y: number) {
    if (this.board[y][x] === '❌' || this.board[y][x] === '⭕') {
      return;
    }
    this.board[y][x] = '❌';
    this.easyAi();
    //Todo add non fixed difficulty
  }

  easyAi() {
    const x = this.randomNum(3, 0);
    const y = this.randomNum(3, 0);
    if (this.freeTiles() == 0) {
      return;
    }
    if (this.board[y][x] === '❌' || this.board[y][x] === '⭕') {
      this.easyAi();
      return;
    }
    this.board[y][x] = '⭕';
    return x + ' ' + y;
  }

  freeTiles() {
    const free = [];
    for (let row of this.board) {
      const filter = row.filter((f) => f === '');
      for (let count of filter) {
        free.push(filter);
      }
    }
    return free.length;
  }
}
