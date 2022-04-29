import {
  LOAD_GIFT_CARDS,
  LOAD_SINGLE_GIFT_CARDS,
  GIFT_CARD_SENT,
  GIFT_CARD_RECEIVED,
  SEND_EMAIL_START,
  SEND_EMAIL_FAILED,
  UPDATE_GIFT_CARD,
  SEND_EMAIL_END,
  UPDATE_GIFT_RECEIVER,
  BEGINS_CARD_LOADING,
  ENDS_CARD_LOADING,
  UPDATE_GIFT_CARD_LIST,
  DELETE_GIFT_CARDS,
  HAS_MORE_CARDS,
  RESET_CARDS,
  ADD_COMMENTS,
} from "../types/giftCardTypes";

const initialState = {
  giftCardList: [],
  giftCardFilterList: [],
  giftCardDetails: {},
  giftCardReceived: [],
  giftCardSent: [],
  sendingEmailLoader: false,
  giftCardError: null,
  cardLoader: false,
  hasMoreCard: true,
};

export const giftCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GIFT_CARDS:
      return {
        ...state,
        giftCardList:
          state.giftCardList.length === 0
            ? action.payload
            : [...state.giftCardList, ...action.payload],
        hasMoreCard: action.payload.length >= 20,
        giftCardError: null,
      };

    case LOAD_SINGLE_GIFT_CARDS:
      return {
        ...state,
        giftCardDetails: action.payload,
        giftCardError: null,
      };
    case GIFT_CARD_RECEIVED:
      return {
        ...state,
        giftCardReceived: action.payload,
        giftCardError: null,
      };
    case GIFT_CARD_SENT:
      return {
        ...state,
        giftCardSent: action.payload,
        giftCardError: null,
      };

    case SEND_EMAIL_START:
      return {
        ...state,
        sendingEmailLoader: true,
        giftCardError: null,
      };

    case SEND_EMAIL_END:
      return {
        ...state,
        sendingEmailLoader: false,
        giftCardError: null,
      };

    case SEND_EMAIL_FAILED:
      return {
        ...state,
        sendingEmailLoader: false,
        giftCardError: action.payload,
      };

    case UPDATE_GIFT_CARD:
    case ADD_COMMENTS:
      return {
        ...state,
        giftCardDetails: action.payload,
        giftCardError: null,
      };

    case UPDATE_GIFT_RECEIVER:
      const giftCardReceived = state.giftCardReceived.map((ele) => {
        if (ele.id === action.payload.id) {
          return action.payload;
        }
        return ele;
      });
      return {
        ...state,
        giftCardReceived,
        giftCardError: null,
      };

    case BEGINS_CARD_LOADING:
      return {
        ...state,
        cardLoader: true,
        giftCardError: null,
      };

    case ENDS_CARD_LOADING:
      return {
        ...state,
        cardLoader: false,
        giftCardError: null,
      };

    case UPDATE_GIFT_CARD_LIST:
      const updatedCards = state.giftCardList.map((ele) => {
        if (ele.id === action.payload.id) {
          return action.payload;
        }
        return ele;
      });
      return {
        ...state,
        giftCardList: updatedCards,
        giftCardError: null,
      };

    case DELETE_GIFT_CARDS:
      const filteredCards = state.giftCardList.filter(
        (ele) => ele.id !== action.payload
      );
      return {
        ...state,
        giftCardList: filteredCards,
        giftCardError: null,
      };

    case HAS_MORE_CARDS:
      return {
        ...state,
        hasMoreCard: action.payload,
      };

    case RESET_CARDS:
      return {
        ...state,
        giftCardList: [],
      };
    default:
      return state;
  }
};
