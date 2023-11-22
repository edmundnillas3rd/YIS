export function generateYearRange(startYear?: number) {
    const currentYear = new Date().getFullYear();
    const years = [];
    startYear = startYear || 2000;
    while (startYear <= currentYear) {
        years.push(startYear++);
    }
    return years;
}