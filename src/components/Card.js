const Card = (content, extraClass = "", extraClass2 = "") => {
  return `<div class="bg-white p-4 shadow ${extraClass} ${extraClass2}">${content}</div>`;
};

export default Card;
