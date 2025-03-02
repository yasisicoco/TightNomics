// /src/pages/dashboard.js
import { getUser, updateUser } from "../utils/storage.js";
import Header from "../components/Header.js";
import Calendar from "../components/Calendar.js";
import TransactionForm from "../components/Form.js";
import TransactionList from "../components/TransactionList.js";
import Card from "../components/Card.js";

const loadDashboardPage = () => {
  // 로그인 세션 없이, 로컬 스토리지에 저장된 사용자 데이터를 불러오거나,
  // 없다면 기본 사용자 객체를 생성합니다.
  let user = getUser();
  if (!user) {
    user = {
      budgetGoal: null,
      transactions: [],
    };
    updateUser(user);
  }

  document.getElementById("app").innerHTML = `
    <div class="flex flex-col bg-gray-100 mx-auto space-y-4 h-full min-h-screen w-full max-w-[600px]">
      ${Card(Header(user))}
      ${Card(Calendar(user), "bg-gray-100")}
      ${Card(
        `
        ${TransactionList(user.transactions)}
        ${TransactionForm()}
      `
      )}
    </div>
  `;

  // ---------- [1] 하루 목표 영역 이벤트 처리 ----------
  const goalButton = document.getElementById("goalButton");
  const goalInput = document.getElementById("goalInput");

  goalButton.addEventListener("click", () => {
    goalButton.classList.add("opacity-0");
    goalInput.classList.remove("opacity-0", "pointer-events-none");
    goalInput.classList.add("opacity-100");
    goalInput.value = user.budgetGoal || "";
    goalInput.focus();
  });

  let goalUpdateCalled = false;
  const updateGoal = () => {
    if (goalUpdateCalled) return;
    goalUpdateCalled = true;
    const newGoal = Number(goalInput.value);
    if (newGoal > 0) {
      user.budgetGoal = newGoal;
      updateUser(user);
      alert("하루 목표 지출량이 설정되었습니다.");
    }
    goalButton.textContent =
      "하루 목표 지출: " +
      (user.budgetGoal ? user.budgetGoal + "원" : "미설정");
    goalButton.classList.remove("opacity-0");
    goalInput.classList.remove("opacity-100");
    goalInput.classList.add("opacity-0", "pointer-events-none");
    loadDashboardPage();
  };

  goalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") updateGoal();
  });
  goalInput.addEventListener("blur", updateGoal);

  // ---------- [2] 거래 내역 추가 폼 토글 ----------
  document
    .getElementById("toggleTransactionForm")
    .addEventListener("click", () => {
      document
        .getElementById("transactionFormContainer")
        .classList.toggle("hidden");
    });

  // ---------- [3] 거래 내역 추가 이벤트 처리 ----------
  document.getElementById("transactionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("transDate").value;
    const type = document.getElementById("transType").value;
    const amount = document.getElementById("transAmount").value;
    const description = document.getElementById("transDescription").value;

    if (!date || !type || !amount || !description) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    const newTransaction = { date, type, amount, description };
    user.transactions.push(newTransaction);
    updateUser(user);
    loadDashboardPage();
  });

  // ---------- [4] 거래 유형 선택 이벤트 처리 ----------
  document.getElementById("money-plus").addEventListener("click", function () {
    document.getElementById("transType").value = "수입";
    this.classList.add("bg-green-400", "text-white");
    document
      .getElementById("money-minus")
      .classList.remove("bg-red-400", "text-white");
  });
  document.getElementById("money-minus").addEventListener("click", function () {
    document.getElementById("transType").value = "지출";
    this.classList.add("bg-red-400", "text-white");
    document
      .getElementById("money-plus")
      .classList.remove("bg-green-400", "text-white");
  });
};

export default loadDashboardPage;
