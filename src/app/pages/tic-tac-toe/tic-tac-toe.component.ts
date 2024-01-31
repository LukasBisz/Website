import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.randomNum());
  }

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  randomNum(): number {
    var random = Math.random() * 2;
    var number = Math.floor(random);
    return number;
  }

  clickTile(x: number, y: number) {
    if (this.board[y][x] === 'X' || this.board[y][x] === 'O') {
      return;
    }
    this.board[y][x] = 'X';
    console.log(x, y);
  }




  
}
