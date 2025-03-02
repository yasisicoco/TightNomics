const TransactionForm = () => {
  return `
    <div>
      <button id="toggleTransactionForm" class="w-full bg-gray-300 text-black p-2 rounded">새로운 내역 추가</button>
    </div>
    <div id="transactionFormContainer" class="hidden mt-4">
      <form id="transactionForm" class="flex flex-col space-y-2">
        <input type="date" id="transDate" class="w-full p-2 border rounded" required>
        <div class="flex space-x-2">
          <button type="button" id="money-plus" class="w-1/2 p-2 border rounded bg-gray-200">수입</button>
          <button type="button" id="money-minus" class="w-1/2 p-2 border rounded bg-gray-200">지출</button>
        </div>
        <input type="hidden" id="transType" required>
        <input type="number" id="transAmount" placeholder="금액" class="w-full p-2 border rounded" required>
        <input type="text" id="transDescription" placeholder="내용" class="w-full p-2 border rounded" required>
        <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">추가</button>
      </form>
    </div>
  `;
};

export default TransactionForm;
