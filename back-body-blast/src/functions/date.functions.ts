export const getPeriodNumberOfWeekday = (date: Date) => {
  const weekday = date.getDay();
  return date.getDay() === 0 ? 7 : weekday;
};

export const getNumberOfWeeksInBetween = (first: Date, last: Date, days: number) => {
  let weeks = 1;
  for (let i = 0; i < days; ++i) {
    if (getPeriodNumberOfWeekday(first) > getPeriodNumberOfWeekday(last)) weeks++;
    first.setDate(first.getDate() + 1);
    last.setDate(last.getDate() + 1);
  }
  return weeks;
};
