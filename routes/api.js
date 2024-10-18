'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate.charCodeAt(0) - 65;
      const column = parseInt(coordinate[1]) - 1;

      if (puzzle[row * 9 + column] === value) {
        return res.json({ valid: true });
      }

      const conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflicts.push('row');
      }
      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflicts.push('column');
      }
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflicts.push('region');
      }

      res.json({
        valid: conflicts.length === 0,
        conflict: conflicts.length > 0 ? conflicts : undefined
      });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      const solution = solver.solve(puzzle);
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      res.json({ solution });
    });
};