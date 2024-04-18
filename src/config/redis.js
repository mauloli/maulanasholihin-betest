const { createClient } = require("redis");

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PW,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    console.log("You're now connected db redis ...");
  });
})();

module.exports = client;
