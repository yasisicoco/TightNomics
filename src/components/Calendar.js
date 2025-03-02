const Calendar = (user) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let calendarHTML = `<div class="grid grid-cols-7 gap-1">`;
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  weekDays.forEach((day) => {
    calendarHTML += `<div class="text-center font-bold">${day}</div>`;
  });

  // 이번 달 1일의 요일
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += `<div></div>`;
  }

  // 날짜별 셀 생성
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = d < 10 ? `0${d}` : d;
    const monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    const dailyExpense = user.transactions
      .filter((t) => t.type === "지출" && t.date === dateStr)
      .reduce((acc, t) => acc + Number(t.amount), 0);

    let cellClass = "border p-1 text-center";
    if (user.budgetGoal && dailyExpense > user.budgetGoal) {
      cellClass += " bg-red-300";
    }
    calendarHTML += `<div class="${cellClass}">${d}<br/><span class="text-xs">${dailyExpense}원</span></div>`;
  }
  calendarHTML += `</div>`;
  return calendarHTML;
};

export default Calendar;
