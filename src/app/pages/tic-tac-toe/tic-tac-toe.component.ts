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
  turnCount: number = 0;
  winner?: string;
  draw: boolean = false;
  playerTurn: boolean = true

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  winningCombinations: number[][][] = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  randomNum(max: number, min: number): number {
    var random = Math.random() * (max - min) + min;
    var number = Math.floor(random);
    return number;
  }

  chooseBeginner() {
    const beginner = this.randomNum(0, 2);
    if (beginner === 1) {
      this.playerTurn = false
      this.easyAi();
    } else return;
  }

  clickTile(x: number, y: number) {
    if (!this.playerTurn){ 
      return
    }
    if (this.board[y][x] === '❌' || this.board[y][x] === '⭕') {
      return;
    }
    this.board[y][x] = '❌';
    this.turnCount++;
    if (this.checkDraw()) {
      this.draw = true;
    }
    if (this.checkWin('❌')) {
      this.winner = 'Won';
      return;
    }
    this.playerTurn = false
    this.easyAi();
    //Todo add non fixed difficulty
  }

  checkWin(symbol: string): any {
    let allMatch = true;
    for (const index of this.winningCombinations) {
      allMatch = true;
      for (const combination of index) {
        const y = combination[0];
        const x = combination[1];
        if (this.board[y][x] === '' || this.board[y][x] !== symbol) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) {
        return true;
      }
    }
    return allMatch;
  }

  checkDraw() {
  return this.turnCount > 8 && !this.checkWin('❌') && !this.checkWin('⭕');
  }

  easyAi() {
    const y = this.randomNum(3, 0);
    const x = this.randomNum(3, 0);
    if (this.turnCount > 8) {
      return;
    }
    if (this.board[y][x] === '❌' || this.board[y][x] === '⭕') {
      this.easyAi();
      return;
    }
    this.board[y][x] = '⭕';
    this.turnCount++;
    if (this.checkWin('⭕')) {
      this.winner = 'Lost';
      return;
    }
    this.playerTurn = true
  }

  mediumAi() {}

  hardAi() {}
}
