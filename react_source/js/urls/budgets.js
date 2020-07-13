import BudgetsPage from '../budgets/BudgetsPage';
import NewBudget from '../budgets/new_budget/NewBudget';


export default (base) => (
    [
        {
            name: 'Budgets',
            url: base + '/',
            component: BudgetsPage
        },
        {
            name: 'New budget',
            url: base + '/new/',
            component: NewBudget
        }
    ]
);