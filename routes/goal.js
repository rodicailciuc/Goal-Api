import express from 'express';

import goalControllers from '../controllers/goal.js';

const router = express.Router();
const { getGoals, getGoal, addGoalForm, addGoal, updateGoal, deleteGoal } =
    goalControllers;

router.get('/goals', getGoals);
router.get('/goals/:id', getGoal);
router.get('/add', addGoalForm);
router.post('/add', addGoal);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

export default router;
