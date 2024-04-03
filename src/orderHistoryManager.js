// orderHistoryManager.js

let orderHistory = [];

export const getOrderHistory = () => orderHistory;

export const addOrderToHistory = (newOrder) => {
  orderHistory.push(newOrder);
};
