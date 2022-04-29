import axios from "axios";
import { sendEmailGrid } from "../sendEmail";

jest.mock("axios");
it("Should be able to send the email", async () => {
  axios.post.mockResolvedValueOnce({
    message: "Email sent successfully",
  });
  const mail = await sendEmailGrid(
    "shradhasuman2@gmail.com",
    "My message is last part"
  );
  expect(axios.post).toHaveBeenCalledWith(`sendEmail`, {
    message: "My message is last part",
    toEmail: "shradhasuman2@gmail.com",
  });
  expect(mail).toEqual({
    message: "Email sent successfully",
  });
});
