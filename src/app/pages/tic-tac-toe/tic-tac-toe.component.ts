import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiDifficultyService } from '../../services/ai-difficulty.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent {
  turnCount: number = 0;
  winner?: string;
  playerTurn: boolean = true;
  playerSymbol: string = '❌';
  aiSymbol: string = '⭕';
  selectedDifficulty: string = 'Medium';
  hideGamePopUp: boolean = false

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

  constructor(private aiDifficulty: AiDifficultyService) {}

  randomNum(max: number, min: number): number {
    var random = Math.random() * (max - min) + min;
    var number = Math.floor(random);
    return number;
  }

  choosePlayerSymbol() {
    this.playerSymbol = '⭕';
    this.aiSymbol = '❌';
    this.playerTurn = false;
    this.checkDifficulty();
  }

  reset() {
    this.turnCount = 0;
    this.playerTurn = true;
    this.playerSymbol = '❌';
    this.aiSymbol = '⭕';
    delete this.winner;
    this.hideGamePopUp = false
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  resetBg(){
    this.hideGamePopUp = true
  }

  clickTile(x: number, y: number) {
    if (!this.playerTurn) {
      return;
    }
    if (this.turnCount > 8) {
      return;
    }
    if (this.board[y][x] === '❌' || this.board[y][x] === '⭕') {
      return;
    }
    this.board[y][x] = this.playerSymbol;
    this.turnCount++;
    this.playerTurn = false;
    if (this.checkDraw()) {
      this.winner = 'Draw';
    }
    if (this.checkWin(this.playerSymbol)) {
      this.winner = 'You Won';
      return;
    }
    this.checkDifficulty();
  }

  checkDifficulty() {
    switch (this.selectedDifficulty) {
      case 'Easy':
        this.easyAi();
        break;

      case 'Medium':
        this.mediumAi();
        break;
    }
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
    setTimeout(() => {
      this.board[y][x] = this.aiSymbol;
      this.turnCount++;
      if (this.checkDraw()) {
        this.winner = 'Draw';
      }
      if (this.checkWin(this.aiSymbol)) {
        this.winner = 'You Lost';
        return;
      }
      this.playerTurn = true;
    }, 400);
  }

  mediumAi() {
    if (this.turnCount > 8) {
      return;
    }
    const position = this.aiDifficulty.medium(this.board);
    const y = position[0];
    const x = position[1];
    setTimeout(() => {
      this.board[y][x] = this.aiSymbol;
      this.turnCount++;
      if (this.checkDraw()) {
        this.winner = 'Draw';
      }
      if (this.checkWin(this.aiSymbol)) {
        this.winner = 'You Lost';
        return;
      }
      this.playerTurn = true;
    }, 400);
  }
}
