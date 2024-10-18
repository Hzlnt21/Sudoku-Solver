const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
  beforeEach(function() {
    solver = new Solver();
  });

  test('Logic handles a valid puzzle string of 81 characters', function() {
    const validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.validate(validPuzzle));
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
    const invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a';
    assert.isFalse(solver.validate(invalidPuzzle));
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function() {
    const shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    assert.isFalse(solver.validate(shortPuzzle));
  });

  test('Logic handles a valid row placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkRowPlacement(puzzle, 0, 1, '3'));
  });

  test('Logic handles an invalid row placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 1, '1'));
  });

  test('Logic handles a valid column placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkColPlacement(puzzle, 0, 1, '3'));
  });

  test('Logic handles an invalid column placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 1, '2'));
  });

  test('Logic handles a valid region (3x3 grid) placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkRegionPlacement(puzzle, 4, 4, '5'));
  });

  test('Logic handles an invalid region (3x3 grid) placement', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.checkRegionPlacement(puzzle, 4, 4, '1'));
  });

  test('Valid puzzle strings pass the solver', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isString(solver.solve(puzzle));
  });

  test('Invalid puzzle strings fail the solver', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a';
    assert.isFalse(solver.solve(puzzle));
  });

  test('Solver returns the expected solution for an incomplete puzzle', function() {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(puzzle), solution);
  });
});