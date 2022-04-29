import Axios from "../config/api.config";

export const saveUserDetails = (userObj) => {
  return Axios.post("/users", userObj);
};

export const getUserDetails = (email) => {
  return Axios.get(`/users?email=${email}`);
};

export const loadGiftCards = (
  pageNumber,
  limit,
  filterBy = "all",
  sortBy,
  searchText
) => {
  // JSON Server Pagination
  let filterString = "";
  if (filterBy === "All" && sortBy.type === "none") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=id&_order=desc`;
  } else if (filterBy && sortBy.type === "none") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=id&_order=desc&cardRetailer=${filterBy}`;
  } else if (sortBy.type !== "none" && filterBy === "All") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=${sortBy.type}&_order=${sortBy.sortByOrder}`;
  } else if (sortBy.type !== "none" && filterBy !== "All") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=${sortBy.type}&_order=${sortBy.sortByOrder}&cardRetailer=${filterBy}`;
  }

  if (searchText) {
    filterString += `&q=${searchText}`;
  }
  return Axios.get(`/giftcards${filterString}`);
};

export const loadSingleCardSlot = (id) => {
  return Axios.get(`/giftcards/${id}`);
};

export const loadGiftCardReceivedList = (email) => {
  return Axios.get(`/giftTransact?receiverEmail=${email}`);
};

export const loadGiftCardSentList = (email) => {
  return Axios.get(`/giftTransact?senderEmail=${email}`);
};

export const updateUserDetails = (user) => {
  return Axios.put(`/users/${user.id}`, user);
};

export const updateGiftCardsDetails = (card) => {
  return Axios.put(`/giftCards/${card.id}`, card);
};

export const saveGiftCardTransact = (giftCardTransact) => {
  return Axios.post("/giftTransact", giftCardTransact);
};

export const updateGiftCardTransact = (cardObj) => {
  return Axios.put(`/giftTransact/${cardObj.id}`, cardObj);
};

export const saveNewCards = (newCard) => {
  return Axios.post("/giftCards", {
    ...newCard,
    id: new Date() + Math.floor(Math.random() * 1000),
  });
};

export const deleteGiftCard = (id) => {
  return Axios.delete(`/giftcards/${id}`);
};
