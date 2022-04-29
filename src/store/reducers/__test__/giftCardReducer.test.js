import { giftCardReducer } from "../giftCardReducer";
import * as giftCardTypes from "../../types/giftCardTypes";
describe("giftCardReducer functionality", () => {
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

  const dummyCardsArray = [
    {
      cardName: "Uber Gift Card",
      cardPoints: 12,
      cardCategory: "Ecommerce",
      cardRetailer: "Amazon",
      cardIssueDate: "2022-04-18T07:11:54.233Z",
      cardExpiryDate: "2025-01-01T00:00:00.000Z",
      cardCount: 91,
      cardImage: "https://source.unsplash.com/random/250*250?apple",
      cardVendor: "Uber",
      cardShortDesc: "10% OFF",
      cardLongDesc:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quisquam tenetur alias ducimus nostrum voluptate, nam suscipit ipsa dolorem mollitia error soluta, distinctio esse. Earum, quo! Cupiditate dignissimos iste ratione.",
      cardComments: [],
      id: 1650265917967,
    },
    {
      cardName: "Flipkart Gift Card",
      cardPoints: 46,
      cardCategory: "Ecommerce",
      cardRetailer: "Amazon",
      cardIssueDate: "2022-04-18T07:11:54.234Z",
      cardExpiryDate: "2025-01-01T00:00:00.000Z",
      cardCount: 91,
      cardImage: "https://source.unsplash.com/random/250*250?amazon",
      cardVendor: "Flipkart",
      cardShortDesc: "10% OFF",
      cardLongDesc:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quisquam tenetur alias ducimus nostrum voluptate, nam suscipit ipsa dolorem mollitia error soluta, distinctio esse. Earum, quo! Cupiditate dignissimos iste ratione.",
      cardComments: [],
      id: 1650265916547,
    },
  ];

  const dummyCardRecieved = [
    {
      senderEmail: "yoyogiftg2@gmail.com",
      receiverEmail: "lathak95@gmail.com",
      cardId: 1,
      cardName: "Yoyo10",
      cardPoints: 123,
      cardShortDesc: "10% OFF",
      cardImage:
        "https://images.gyft.com/merchants/i-587-1346844989795-53_hd.png",
      cardIssueDate: "Sun May 19 2019 15:43:25 GMT+0530 (India Standard Time)",
      cardExpiryDate: "Sun May 26 2019 15:43:25 GMT+0530 (India Standard Time)",
      isRedeemed: false,
    },
  ];
  it("should return the initial state", () => {
    expect(giftCardReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOAD_GIFT_CARDS", () => {
    const action = {
      type: giftCardTypes.LOAD_GIFT_CARDS,
      payload: dummyCardsArray,
    };
    const expectedState = {
      ...initialState,
      giftCardList: dummyCardsArray,
      hasMoreCard: dummyCardsArray >= 20,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOAD_SINGLE_GIFT_CARDS", () => {
    const action = {
      type: giftCardTypes.LOAD_SINGLE_GIFT_CARDS,
      payload: dummyCardsArray[0],
    };
    const expectedState = {
      ...initialState,
      giftCardDetails: dummyCardsArray[0],
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GIFT_CARD_RECEIVED", () => {
    const action = {
      type: giftCardTypes.GIFT_CARD_RECEIVED,
      payload: dummyCardRecieved,
    };
    const expectedState = {
      ...initialState,
      giftCardReceived: dummyCardRecieved,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GIFT_CARD_SENT", () => {
    const action = {
      type: giftCardTypes.GIFT_CARD_SENT,
      payload: dummyCardRecieved,
    };
    const expectedState = {
      ...initialState,
      giftCardSent: dummyCardRecieved,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SEND_EMAIL_START", () => {
    const action = {
      type: giftCardTypes.SEND_EMAIL_START,
    };
    const expectedState = {
      ...initialState,
      sendingEmailLoader: true,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SEND_EMAIL_END", () => {
    const action = {
      type: giftCardTypes.SEND_EMAIL_END,
    };
    const expectedState = {
      ...initialState,
      sendingEmailLoader: false,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SEND_EMAIL_FAILED", () => {
    const action = {
      type: giftCardTypes.SEND_EMAIL_FAILED,
      payload: "Error",
    };
    const expectedState = {
      ...initialState,
      sendingEmailLoader: false,
      giftCardError: "Error",
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should handel UPDATE_GIFT_CARD", () => {
    const action = {
      type: giftCardTypes.UPDATE_GIFT_CARD,
      payload: dummyCardsArray[0],
    };
    const expectedState = {
      ...initialState,
      giftCardDetails: dummyCardsArray[0],
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should handel ADD_COMMENTS", () => {
    const action = {
      type: giftCardTypes.ADD_COMMENTS,
      payload: dummyCardsArray[0],
    };
    const expectedState = {
      ...initialState,
      giftCardDetails: dummyCardsArray[0],
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should be UPDATE_GIFT_RECEIVER", () => {
    const action = {
      type: giftCardTypes.UPDATE_GIFT_RECEIVER,
      payload: dummyCardRecieved[0],
    };
    const expectedState = {
      ...initialState,
      giftCardReceived: dummyCardRecieved,
      giftCardError: null,
    };
    expect(
      giftCardReducer(
        { ...initialState, giftCardReceived: dummyCardRecieved },
        action
      )
    ).toEqual(expectedState);
  });

  it("Should BEGINS_CARD_LOADING", () => {
    const action = {
      type: giftCardTypes.BEGINS_CARD_LOADING,
    };
    const expectedState = {
      ...initialState,
      cardLoader: true,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should END_CARD_LOADING", () => {
    const action = {
      type: giftCardTypes.ENDS_CARD_LOADING,
    };
    const expectedState = {
      ...initialState,
      cardLoader: false,
      giftCardError: null,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should Update the UPDATE_GIFT_CARD_LIST", () => {
    const action = {
      type: giftCardTypes.UPDATE_GIFT_CARD_LIST,
      payload: dummyCardsArray[0],
    };
    const expectedState = {
      ...initialState,
      giftCardList: dummyCardsArray,
      giftCardError: null,
    };
    expect(
      giftCardReducer(
        { ...initialState, giftCardList: dummyCardsArray },
        action
      )
    ).toEqual(expectedState);
  });

  it("Should Update the DELETE_GIFT_CARDS", () => {
    const action = {
      type: giftCardTypes.DELETE_GIFT_CARDS,
      payload: dummyCardsArray[0],
    };
    const expectedState = {
      ...initialState,
      giftCardList: dummyCardsArray,
      giftCardError: null,
    };
    expect(
      giftCardReducer(
        { ...initialState, giftCardList: dummyCardsArray },
        action
      )
    ).toEqual(expectedState);
  });

  it("Should Update the HAS_MORE_CARDS", () => {
    const action = {
      type: giftCardTypes.HAS_MORE_CARDS,
      payload: true,
    };
    const expectedState = {
      ...initialState,
      hasMoreCard: true,
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Should Update the RESET_CARDS", () => {
    const action = {
      type: giftCardTypes.RESET_CARDS,
    };
    const expectedState = {
      ...initialState,
      giftCardList: [],
    };
    expect(giftCardReducer(initialState, action)).toEqual(expectedState);
  });
});
