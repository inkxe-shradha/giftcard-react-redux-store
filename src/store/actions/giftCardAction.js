import {
  loadGiftCards,
  loadSingleCardSlot,
  loadGiftCardReceivedList,
  loadGiftCardSentList,
  updateUserDetails,
  updateGiftCardTransact,
  updateGiftCardsDetails,
  saveGiftCardTransact,
  saveNewCards,
  deleteGiftCard,
} from "../../api/globalApi";
import { sendEmailGrid } from "../../shared/utils/sendEmail";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../shared/utils/storageSession";
import { UPDATE_USER_DETAILS } from "../types/authTypes";
import {
  LOAD_GIFT_CARDS,
  LOAD_SINGLE_GIFT_CARDS,
  GIFT_CARD_RECEIVED,
  GIFT_CARD_SENT,
  SEND_EMAIL_START,
  UPDATE_GIFT_CARD,
  BEGINS_CARD_LOADING,
  UPDATE_GIFT_RECEIVER,
  SEND_EMAIL_END,
  UPDATE_GIFT_CARD_LIST,
  ENDS_CARD_LOADING,
  DELETE_GIFT_CARDS,
  ADD_COMMENTS,
  HAS_MORE_CARDS,
} from "../types/giftCardTypes";
import { beginsLoading, endsLoading } from "./loadingAction";

const onLoadedCard = (payload) => ({ type: LOAD_GIFT_CARDS, payload });

const onLoadSingleCardDetails = (payload) => ({
  type: LOAD_SINGLE_GIFT_CARDS,
  payload,
});

const onLoadedGiftCardReceived = (payload) => ({
  type: GIFT_CARD_RECEIVED,
  payload,
});

const onLoadedGiftCardSent = (payload) => ({
  type: GIFT_CARD_SENT,
  payload,
});

const updateUserDetailsPayload = (payload) => ({
  type: UPDATE_USER_DETAILS,
  payload,
});

const updateCardDetailsPayload = (payload) => ({
  type: UPDATE_GIFT_CARD,
  payload,
});

const updateCardReceiver = (payload) => ({
  type: UPDATE_GIFT_RECEIVER,
  payload,
});

const updateGiftCardList = (payload) => ({
  type: UPDATE_GIFT_CARD_LIST,
  payload,
});

const onRemovedCardFromList = (payload) => ({
  type: DELETE_GIFT_CARDS,
  payload,
});

const onAddComments = (payload) => ({
  type: ADD_COMMENTS,
  payload,
});

const hasMoreCard = (payload) => ({
  type: HAS_MORE_CARDS,
  payload,
});

const beginsCardLoading = () => ({ type: BEGINS_CARD_LOADING });
const endCardLoading = () => ({ type: ENDS_CARD_LOADING });

const startEmailLoading = () => ({ type: SEND_EMAIL_START });
const stopEmailLoading = () => ({ type: SEND_EMAIL_END });

export const loadGiftCard =
  (
    pageNumber = 1,
    pageSize = 20,
    searchText = "",
    sortBy = {},
    filterBy = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch(beginsLoading());
      const { data } = await loadGiftCards(
        pageNumber,
        pageSize,
        filterBy,
        sortBy,
        searchText
      );
      if (data.length > 0) {
        dispatch(onLoadedCard(data));
      } else {
        dispatch(hasMoreCard(false));
      }
      dispatch(endsLoading());
    } catch (error) {
      console.log("Error", error);
      dispatch(endsLoading());
    }
  };

export const loadSingleCard = (id) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadSingleCardSlot(id);
    dispatch(onLoadSingleCardDetails(data));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

export const loadGiftCardReceived = (userEmail) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadGiftCardReceivedList(userEmail);
    dispatch(onLoadedGiftCardReceived(data));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

export const loadGiftCardSent = (userEmail) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadGiftCardSentList(userEmail);
    dispatch(onLoadedGiftCardSent(data));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

// Sending Emails
export const sendEmail =
  (toEmail, fromEmail, message, giftCard) => async (dispatch) => {
    try {
      dispatch(startEmailLoading());
      // Updating the user balance.
      const user = getLocalStorage("user");
      const balancePoints = user.balance_points - giftCard.cardPoints;
      await updateUserDetails({
        ...user,
        balance_points: balancePoints,
      });
      setLocalStorage("user", {
        ...user,
        balance_points: balancePoints,
      });
      dispatch(
        updateUserDetailsPayload({
          ...user,
          balance_points: balancePoints,
        })
      );

      // Sending the email.
      const response = await sendEmailGrid(toEmail, message);
      // Removing the item from the gift card
      const { uploadedData } = await updateGiftCardsDetails({
        ...giftCard,
        cardCount: giftCard.cardCount - 1,
      });

      dispatch(
        updateCardDetailsPayload({
          ...giftCard,
          cardCount: giftCard.cardCount - 1,
        })
      );

      // Logging the sending data into the gift transactions
      const transactionsObj = {
        senderEmail: fromEmail,
        receiverEmail: toEmail,
        cardId: giftCard.id,
        cardName: giftCard.cardName,
        cardPoints: giftCard.cardPoints,
        cardShortDesc: giftCard.cardShortDesc,
        cardIssueDate: giftCard.cardIssueDate,
        cardExpiryDate: giftCard.cardExpiryDate,
        isRedeemed: false,
      };
      const { transatData } = await saveGiftCardTransact(transactionsObj);
      dispatch(stopEmailLoading());
      // Return promise
      return Promise.resolve(response);
    } catch (error) {
      console.log("Error", error);
      dispatch(stopEmailLoading());
      return Promise.reject(error);
    }
  };

//  Redeeming Gift Card
export const redeemGiftCard = (card) => async (dispatch) => {
  try {
    const { data } = await updateGiftCardTransact({
      ...card,
      isRedeemed: true,
    });
    const user = getLocalStorage("user");
    const balancePoints = Number(user.balance_points) + Number(card.cardPoints);
    await updateUserDetails({
      ...user,
      balance_points: balancePoints,
    });
    setLocalStorage("user", {
      ...user,
      balance_points: balancePoints,
    });
    dispatch(
      updateUserDetailsPayload({
        ...user,
        balance_points: balancePoints,
      })
    );
    dispatch(updateCardReceiver(data));
    return Promise.resolve(data);
  } catch (error) {
    console.log("Error", error);
  }
};

// Adding the new card to the user
export const addGiftCard = (card) => async (dispatch) => {
  try {
    dispatch(beginsCardLoading());
    if (card.id) {
      const { data } = await updateGiftCardsDetails(card);
      dispatch(updateGiftCardList(data));
      dispatch(endCardLoading());
      return Promise.resolve(data);
    } else {
      const { data } = await saveNewCards(card);
      dispatch(loadGiftCard(1, 20, "", {}, "All"));
      dispatch(endCardLoading());
      return Promise.resolve(data);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Removing the card from the user
export const deleteGiftCardList = (id) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await deleteGiftCard(id);
    dispatch(onRemovedCardFromList(id));
    dispatch(endsLoading());
    return Promise.resolve(data);
  } catch (error) {
    dispatch(endsLoading());
    console.log("Error", error);
  }
};

/*********************************************************** CARD COMMENT ACTIONS (ALL WILL BE HANDEL BY ONE FUNCTION) ***********************************************************/
export const addNewComment = (card) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await updateGiftCardsDetails(card);
    dispatch(onAddComments(data));
    dispatch(endsLoading());
    return Promise.resolve(data);
  } catch (error) {
    console.log("Error", error);
  }
};
