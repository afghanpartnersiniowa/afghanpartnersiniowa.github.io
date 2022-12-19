const environment = process.env.ELEVENTY_ENV;
const nodeEnv = process.env.NODE_ENV;
const DEV_ENV = "dev";
const PREVIEW_ENV = "preview";
const devUrl = "http://localhost:8080";
const previewUrl = "https://preview.afghanpartnersiniowa.org";
const prodUrl = "https://www.afghanpartnersiniowa.org";

const isPreview = nodeEnv === PREVIEW_ENV;
let isProd = false;
let url;

if (environment === DEV_ENV) {
  url = devUrl;
} else if (isPreview) {
  url = previewUrl;
  isProd = true;
} else {
  url = prodUrl;
  isProd = true;
}

module.exports = {
  environment,
  isProd,
  isPreview,
  url,
  recaptchaSiteKey: "6LeZxm4jAAAAALiSYjBVXZ1lDcCJv8OfuIfURIKH",
};
