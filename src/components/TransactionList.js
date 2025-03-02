// /src/components/TransactionList.js
const TransactionList = (transactions) => {
  if (transactions.length === 0) {
    return `<p class="text-gray-600">내역이 없습니다.</p>`;
  }
  return transactions
    .map((trans) => {
      const amountColor =
        trans.type === "지출" ? "text-red-500" : "text-green-500";
      return `
      <div class="bg-white border border-black-100 p-4 my-2 rounded-lg shadow">
        <div class="flex justify-between">
          <h3 class="text-xl font-bold">${trans.description}</h3>
          <span class="${amountColor} font-bold">
            ${trans.type === "지출" ? "-" : "+"}${trans.amount}원
          </span>
        </div>
        <p class="text-gray-500">${trans.date}</p>
      </div>
    `;
    })
    .join("");
};

export default TransactionList;
