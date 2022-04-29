import axios from "axios";
import * as globalAPI from "./globalApi";
describe("Global API service test suite", () => {
  it("Should load all the gift card when the filter type is ALL and the type is sort type is none", () => {
    axios.get.mockResolvedValueOnce([
      {
        id: 1,
        cardRetailer: "Amazon",
        cardName: "Amazon Gift Card",
        cardDescription: "Amazon Gift Card",
      },
      {
        id: 2,
        cardRetailer: "Flipkart",
        cardName: "Flipkart Gift Card",
        cardDescription: "Flipkart Gift Card",
      },
    ]);
    return globalAPI
      .loadGiftCards(1, 2, "All", { type: "none", sortByOrder: "desc" }, "")
      .then((response) => {
        expect(response).toEqual([
          {
            id: 1,
            cardRetailer: "Amazon",
            cardName: "Amazon Gift Card",
            cardDescription: "Amazon Gift Card",
          },
          {
            id: 2,
            cardRetailer: "Flipkart",
            cardName: "Flipkart Gift Card",
            cardDescription: "Flipkart Gift Card",
          },
        ]);
      });
  });
});
