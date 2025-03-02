const Header = (user) => {
  const totalExpense = user.transactions
    .filter((t) => t.type === "지출")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalIncome = user.transactions
    .filter((t) => t.type === "수입")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return `
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center">긴축정책</h1>
      <div class="flex justify-evenly items-center mt-4">
        <div class="text-xl">총 지출: ${totalExpense}원</div>
        <div class="text-xl">총 수입: ${totalIncome}원</div>
      </div>
      <div id="goalSection" class="relative mt-4">
        <button id="goalButton" class="bg-gray-300 text-black font-extrabold p-2 rounded w-full transition-opacity duration-1000">
          하루 목표 지출: ${user.budgetGoal ? user.budgetGoal + "원" : "미설정"}
        </button>
        <input id="goalInput" type="number" placeholder="하루 목표 지출량 설정" 
          class="bg-white p-2 border rounded w-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 pointer-events-none" required>
      </div>
    </div>
  `;
};

export default Header;
