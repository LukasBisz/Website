import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiCalculationsService {
  calculationMedium(board: string[][]): number[] {
    // check if win is possible
    for (let i = 0; i < 3; i++) {
      // row & column
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ''
      ) {
        return [0, i];
      }
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ''
      ) {
        return [i, 0];
      }
      // diagonal
      if (
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== ''
      ) {
        return [0, 0];
      }
      if (
        board[2][0] === board[1][1] &&
        board[1][1] === board[0][2] &&
        board[2][0] !== ''
      ) {
        return [2, 0];
      }
      if (
        board[0][2] === board[2][0] &&
        board[1][1] === '' &&
        board[0][2] !== '' &&
        board[2][0] !== ''
      ) {
        return [1, 1];
      }
      if (
        board[0][0] === board[2][2] &&
        board[1][1] === '' &&
        board[0][0] !== '' &&
        board[2][2] !== ''
      ) {
        return [1, 1];
      }
    }

    // prevent player turn
    for (let i = 0; i < 3; i++) {
      // row & column
      if (board[0][i] === board[1][i] && board[2][i] === '') {
        return [2, i];
      }
      if (board[i][0] === board[i][1] && board[i][2] === '') {
        return [i, 2];
      }
      // diagonal
      if (board[0][0] === board[1][1] && board[2][2] === '') {
        return [2, 2];
      }
      if (board[2][0] === board[1][1] && board[0][2] === '') {
        return [0, 2];
      }
    }

    // preferred position
    for (let i = 0; i < 3; i++) {
      if (board[1][1] === '') {
        return [1, 1];
      }
      if (board[1][i] === '') {
        return [1, i];
      }
      if (board[i][1] === '') {
        return [i, 1];
      }
    }

    // corners
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === '') {
        return [0, i];
      }
      if (board[i][0] === '') {
        return [i, 0];
      }
      if (board[2][i] === '') {
        return [2, i];
      }
      if (board[i][2] === '') {
        return [i, 2];
      }
    }

    // no possible turn
    return [0, 0];
  }
}
