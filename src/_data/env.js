const environment = process.env.ELEVENTY_ENV;
const nodeEnv = process.env.NODE_ENV;
const DEV_ENV = "dev";
const devUrl = "http://localhost:8080";
const prodUrl = "https://www.afghanpartnersiniowa.org";

let isProd = false;
let url;

if (environment === DEV_ENV) {
  url = devUrl;
} else {
  url = prodUrl;
  isProd = true;
}

module.exports = {
  environment,
  isProd,
  url,
  prodUrl,
  recaptchaSiteKey: "6LeZxm4jAAAAALiSYjBVXZ1lDcCJv8OfuIfURIKH",
};
