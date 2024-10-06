import Goal from '../models/goal.js';

const goalControllers = {
    getGoals: (req, res) => {
        const goals = Goal.getAll();
        const { token } = req.cookies;
        res.status(200).render('goals', { goals, token });
    },
    getGoal: (req, res) => {
        const { id } = req.params;

        const goal = Goal.getGoalById(id);
        if (goal) {
            res.status(200).render('goal', { goal });
        } else {
            res.status(404).render('404', {
                title: 'Goal does not exist',
                message: 'Goal does not exist'
            });
        }
    },
    addGoalForm: (req, res) => {
        res.status(200).render('add-form');
    },
    addGoal: (req, res) => {
        const { description, deadline, completed, priority, category } =
            req.body;
        if (description && deadline && completed && priority && category) {
            Goal.add({ description, deadline, completed, priority, category });
            res.status(302).redirect('/api/goals');
        } else {
            res.status(400).render('404', {
                title: 'Invalid input',
                message: 'All fields should be filled in'
            });
        }
    },
    updateGoal: (req, res) => {
        const { id } = req.params;
        const { description, deadline, completed, priority, category } =
            req.body;
        const goal = Goal.getById(id);
        if (goal) {
            if (description && deadline && completed && priority && category) {
                Goal.update(id, { description, deadline, completed, priority, category});
                res.status(200).json(goal);
            }
            
        } else {
            res.status(404).json({
                title: 'Goal not found',
                message: 'Goal not found'
            });
        }
    },
    deleteGoal: (req, res) => {
        const { id } = req.params;
    const goal = Goal.getById(id);
    if (goal) {
        Goal.delete(id);
        res.status(200).json(goal);
    } else {
        res.status(404).json({
            title: 'Goal not found',
            message: 'Goal not found'
        })
    }}
};

export default goalControllers;
