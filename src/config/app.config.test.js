import { clientId } from "./app.config";

it("Should have the valid client ID and client secret", () => {
  expect(clientId).toBe(
    "25860778518-lt39cmgjc3s1na7pfc564gdn2bilqljq.apps.googleusercontent.com"
  );
});
