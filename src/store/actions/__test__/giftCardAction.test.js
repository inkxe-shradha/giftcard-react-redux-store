import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as giftCardTypes from "../../types/giftCardTypes";
import {
  loadGiftCard,
  loadSingleCard,
  loadGiftCardReceived,
  loadGiftCardSent,
  addNewComment,
  addGiftCard,
  deleteGiftCardList,
} from "../giftCardAction";
import { beginsLoading, endsLoading } from "../loadingAction";
import mockAxios from "jest-mock-axios";

const middleWare = [thunk];
const mockStore = configureStore(middleWare);

describe("giftCardAction", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("Should load the Gift Cards", async () => {
    const data = [
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
    ];

    mockAxios.get.mockResolvedValueOnce({ data });

    const store = mockStore({});

    return store.dispatch(loadGiftCard(1, 20, "", {}, "All")).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.LOAD_GIFT_CARDS,
        payload: data,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });

  it("Should load the single gift card", () => {
    const data = {
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
    };

    mockAxios.get.mockResolvedValueOnce({ data });

    const store = mockStore({});

    return store.dispatch(loadSingleCard(1650265917967)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.LOAD_SINGLE_GIFT_CARDS,
        payload: data,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });

  it("Should load once the Gift-card Received", () => {
    const data = {
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
    };

    mockAxios.get.mockResolvedValueOnce({ data });

    const store = mockStore({});

    return store.dispatch(loadGiftCardReceived("admin@gmail.com")).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.GIFT_CARD_RECEIVED,
        payload: data,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });

  it("Should be call when gift card sent", () => {
    const data = {
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
    };

    mockAxios.get.mockResolvedValueOnce({ data });

    const store = mockStore({});

    return store.dispatch(loadGiftCardSent("admin@gmail.com")).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.GIFT_CARD_SENT,
        payload: data,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });

  it("Should be able to add the gift card", () => {
    const data = {
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
    };

    mockAxios.post.mockResolvedValueOnce({ data });
    mockAxios.get.mockResolvedValueOnce({ data: [data] });

    const store = mockStore({});

    return store.dispatch(addGiftCard(data)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toEqual({
        type: giftCardTypes.BEGINS_CARD_LOADING,
      });
      expect(actions[1]).toEqual(beginsLoading());
      expect(actions[3]).toEqual({
        type: giftCardTypes.LOAD_GIFT_CARDS,
        payload: [data],
      });
      expect(actions[2]).toEqual({
        type: giftCardTypes.ENDS_CARD_LOADING,
      });
      expect(actions[4]).toEqual(endsLoading());
    });
  });

  it("Should be able to update the card", () => {
    const data = {
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
    };

    mockAxios.put.mockResolvedValueOnce({ data });

    const store = mockStore({});

    return store.dispatch(addGiftCard(data)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual({
        type: giftCardTypes.BEGINS_CARD_LOADING,
      });
      expect(actions[1]).toEqual({
        type: giftCardTypes.UPDATE_GIFT_CARD_LIST,
        payload: data,
      });
      expect(actions[2]).toEqual({
        type: giftCardTypes.ENDS_CARD_LOADING,
      });
    });
  });

  it("Should be able to delete the card", () => {
    mockAxios.delete.mockResolvedValueOnce({ data: {} });

    const store = mockStore({});

    return store.dispatch(deleteGiftCardList(1299)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.DELETE_GIFT_CARDS,
        payload: 1299,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });

  it("Should be able to add comments", () => {
    const comment = {
      comment: "This is a comment",
      id: 1650265917967,
      name: "Shradha",
    };

    mockAxios.put.mockResolvedValueOnce({ data: comment });

    const store = mockStore({});

    return store.dispatch(addNewComment(comment)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(beginsLoading());
      expect(actions[1]).toEqual({
        type: giftCardTypes.ADD_COMMENTS,
        payload: comment,
      });
      expect(actions[2]).toEqual(endsLoading());
    });
  });
});
