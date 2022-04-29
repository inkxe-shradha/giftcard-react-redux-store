const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const sgMail = require("@sendgrid/mail");
const EMAIL_KEY =
  "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";

sgMail.setApiKey(EMAIL_KEY);
const middleWare = jsonServer.defaults({
  static: "node_modules/json-server/dist",
});

server.use(middleWare);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  setTimeout(next, 200);
});

server.post("sendEmail", async (req, res, next) => {
  console.log("Here Sending");
});

// Create All Posts Request Handler
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }

  if (req.url === "/sendEmail" && req.method === "POST") {
    const { toEmail, message } = req.body;
    const msg = {
      to: toEmail,
      from: "balmikiprassad69@gmail.com",
      subject: "Gift Card Details",
      text: message,
      html: `<strong>${message}</strong>`,
    };
    sgMail.send(msg).then((res) => {
      console.log(res);
    });
  }
  // Continue to JSON Server router
  next();
});

// Get Email ID and Password from the request body

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
