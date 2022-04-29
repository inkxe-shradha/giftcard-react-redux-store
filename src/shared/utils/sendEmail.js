import Axios from "../../config/api.config";

export const sendEmailGrid = (toEmail, message) => {
  return Axios.post("sendEmail", {
    toEmail,
    message,
  });
};
