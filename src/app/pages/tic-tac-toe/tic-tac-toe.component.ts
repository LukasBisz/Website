import { Component, OnInit } from '@angular/core';
import { max, min } from 'rxjs';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.board.length);
    console.log(this.board[0].length);
    console.log(this.board[0][2]);
    console.log(this.board[0][0] === '');
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
    console.log(x,y)
    

  }
}
