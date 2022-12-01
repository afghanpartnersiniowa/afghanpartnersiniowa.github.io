const Image = require("@11ty/eleventy-img");
const path = require("path");
const { getPlaiceholder } = require("plaiceholder");

async function imageShortcode(src, cls, alt, sizes) {
  const transformedSrc = src.startsWith("/")
    ? path.join(__dirname, "../static", src)
    : src;
  let metadata = await Image(transformedSrc, {
    widths: [600, 900, 1500],
    formats: ["webp"],
    outputDir: "./public/img/",
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

const defaultClass =
  "z-[-1] absolute inset-0 filter w-full h-full";

async function imageWithPlaiceholderBase64(src, cls, alt, sizes, plaiceholderClass) {
  const image = await imageShortcode(src, cls, alt, sizes);
  const { base64 } = await getPlaiceholder(src, { dir: "./src/static" });

  return `
    <img
      alt="${alt}"
      src="${base64}"
      class="${plaiceholderClass || defaultClass}"
    />
    ${image}
  `;
}

module.exports = async function () {
  return (
    await Promise.all(
      [
        {
          name: "logoTitle",
          path: "/img/logo-title.png",
          class: "m-1",
          alt: "Afghan Partners in Iowa logo",
        },
        {
          name: "hero",
          path: "/img/hero.jpg",
          class: "z-[-1] fixed object-cover pointer-events-none max-h-screen-80",
          alt: "Afghan Partners in Iowa logo",
          plaiceholderClass: "z-[-1] fixed object-cover pointer-events-none max-h-screen-80 w-full",
        },
      ].map(async (image) => ({
        name: image.name,
        html: await imageWithPlaiceholderBase64(
          image.path,
          image.class,
          image.alt,
          "(min-width: 30em) 50vw, 100vw",
          image.plaiceholderClass
        ),
      }))
    )
  ).reduce((prev, current) => {
    prev[current.name] = current.html;
    return prev;
  }, {});
};
