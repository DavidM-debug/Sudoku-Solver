// JavaScript source code
function valid_numbers_check(sudoku_board, rows, column, number, bol) {
    let l = sudoku.length;
    //checks if a number can be put in the column
    for (let r = 0; r < l; r++) { 
        if (bol && r == rows) { continue; }
        if (number == sudoku_board[r][column]) { return false; }
    }

    //checks if a number can be put in the row
    for (let c = 0; c < l; c++) { 
        if (bol && c == column) { continue; }
        if (number == sudoku_board[rows][c]) { return false; }
    }

    //gets the current quadrant position by dividing the row and column by 3 and then multiplying it by 3 again
    let quadrant_row = Math.floor(rows / 3)
    let quadrant_column = Math.floor(column / 3)
    quadrant_column = quadrant_column * 3
    quadrant_row = quadrant_row * 3
    //checks for all numbers in the quadrant
    for (let x = quadrant_row; x < quadrant_row + 3; x++)  { 
        for (let y = quadrant_column; y < quadrant_column + 3; y++) {
            if (bol && x == rows && y == column) { continue; }
            if (number == sudoku_board[x][y]) { return false; }
        }
    }
    return true
}

function solve_sudoku_board(sudoku_board, i, j) {
    /*
     Function uses recursive backtracking to declare if the sudoku board is solved
     :param sudoku_board: the sudoku
     :param i: the rows in the sudoku board(starting from 0)
     :param j: the columns in the sudoku board(starting from 0)
     :return: true when the sudoku board is solved
     */

    //checks if the sudoku board is completed
    if (i == 8 && j == 9) { return true; }

    //resets te column of the sudoku board to 0 whenever it goes out of range, adds 1 to the row
    if (j == 9) {
        j = 0;
        i += 1;
    }

    //checks if a number is already in the current position, calls the function again if it is skipping the position in the process
    if (sudoku_board[i][j] != 0) { return solve_sudoku_board(sudoku_board, i, j + 1) }

    //goes through numbers 1 to 9 checking if it can be put there if it can it goes deeper into the recursion if it is not it goes to return false and declares the path as invalid
    for (let x = 1; x < 10; x++) {
        if (valid_numbers_check(sudoku_board, i, j, x, false)) {
            sudoku_board[i][j] = x
            if (solve_sudoku_board(sudoku_board, i, j + 1)) {
                return true;
            }
            sudoku_board[i][j] = 0
        }
    }
    return false
}

function check_rules(sudoku_board, i, j) {
    if (i == 8 && j == 9) { return true; }

    if (j == 9) {
        j = 0
        i += 1
    }
    x = sudoku_board[i][j]
    if (valid_numbers_check(sudoku_board, i, j, x, true)) {
        return check_rules(sudoku_board, i, j + 1)
    }
    return false
}

function show_sudoku_board(sudoku_board) {
    /*
        Function prints the sudoku board without a grid format
        :param sudoku_board: the board
        :return: nothing
    */
    let l = sudoku_board.length
    let l1 = sudoku_board[0].length
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l1; j++) {
            if (j != l1 - 1) {
                console.log(sudoku_board[i][j]," ")
            } else {
                console.log(sudoku_board[i][j])
            }
        }
    }
}

sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]];

console.log("anything")

if (solve_sudoku_board(sudoku, 0, 0)) {
    show_sudoku_board(sudoku)
    if (check_rules(sudoku, 0, 0)) {
        show_sudoku_board(sudoku)
    } else {
        console.log("el sudoku introduit no es valid")
    }

} else { console.log("No hi ha solució") }
show_sudoku_board(sudoku)
