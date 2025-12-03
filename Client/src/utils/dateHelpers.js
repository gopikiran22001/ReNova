import { format } from 'date-fns';

export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const formatMonthYear = (date) => {
    return format(date, 'MMMM yyyy');
};
