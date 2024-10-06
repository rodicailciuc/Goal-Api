import { v4 as Id } from 'uuid';

let goals = [
    {
        id: Id(),
        description: 'Learn Node.js',
        deadline: '01-01-2025',
        completed: false,
        priority: 'high',
        category: 'learning'
    },
    {
        id: Id(),
        description: 'Backend Developer Internship/Job',
        deadline: '11-30-2024',
        completed: false,
        priority: 'high',
        category: 'work'
    },

    {
        id: Id(),
        description: 'Cyber Security',
        deadline: '31-12-2026',
        completed: false,
        priority: 'medium',
        category: 'professional development'
    },
    {
        id: Id(),
        description: 'Go to Disneyland Paris with my Daughter',
        deadline: '31-12-2025',
        completed: false,
        priority: 'medium',
        category: 'family'
    }
];

class Goal {
    static getAll() {
        return goals;
    }

    static getGoalById(id) {
        return goals.find((goal) => goal.id === id);
    }

    static add(goal) {
        const newGoal = { id: Id(), ...goal };
        goals.unshift(newGoal);
        return newGoal;
    }

    static update(id, goal) {
        const goalExist = goals.find((goal) => goal.id === id);
        if (goalExist) {
            goalExist.description = goal.description;
            goalExist.deadline = goal.deadline;
            goalExist.completed = goal.completed;
            goalExist.priority = goal.priority;
            goalExist.category = goal.category;

            return goalExist;
        } else {
            return null;
        }
    }

    static remove(id) {
        const goalExist = goals.find((goal) => goal.id === id);
        if (goalExist) {
            goals = goals.find((goal) => goal.id !== id);
            return true;
        } else {
            return false;
        }
    }
}

export default Goal;
