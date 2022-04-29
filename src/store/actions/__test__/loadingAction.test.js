import { BEGINS_LOADING, ENDS_LOADING } from "../../types/loagingTypes";
import { beginsLoading, endsLoading } from "../loadingAction";

describe("loadingAction", () => {
  it("should dispatch beginsLoading and endsLoading", () => {
    const expectLoadingAction = {
      type: BEGINS_LOADING,
    };
    const expectEndLoadingAction = {
      type: ENDS_LOADING,
    };

    const loadingAction = beginsLoading();
    const endLoadingAction = endsLoading();
    expect(loadingAction).toEqual(expectLoadingAction);
    expect(endLoadingAction).toEqual(expectEndLoadingAction);
  });
});
