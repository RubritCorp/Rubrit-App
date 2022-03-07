const { createServer } = require("https");
const fs = require("fs");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  // key: fs.readFileSync("./cert/localhost.key"),
  key: fs.readFileSync("./cert/key.pem"),

  // cert: fs.readFileSync("./cert/localhost.cert"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
