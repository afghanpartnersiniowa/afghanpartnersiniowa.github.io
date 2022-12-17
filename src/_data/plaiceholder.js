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
          path: "/img/children-war.webp",
          class: "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
          alt: "Afghan children",
          plaiceholderClass: "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
        },
        {
          name: "afghansHelpingAfghans",
          path: "/img/safi-paperwork.jpg",
          class: "relative pointer-events-none h-auto w-full",
          alt: "Shir Agha Safi, Executive Director Afghan Partners in Iowa, helps a volunteer helping Afghan refugees fill out asylum paperwork",
          plaiceholderClass: "absolute pointer-events-none h-full w-full",
        },
        {
          name: "immigrants",
          path: "/img/immigrant-family.webp",
          class: "relative pointer-events-none h-auto w-full",
          alt: "An immigrant family with suitcases and passports",
          plaiceholderClass: "absolute pointer-events-none h-full w-full",
        },
        {
          name: "volunteer",
          path: "/img/volunteer.jpg",
          class: "relative pointer-events-none h-auto w-full",
          alt: "Shir Agha Safi, Executive Director Afghan Partners in Iowa, helps a volunteer helping Afghan refugees fill out asylum paperwork",
          plaiceholderClass: "absolute pointer-events-none h-full w-full",
        },
        {
          name: "flags",
          path: "/img/afghanistan-american-flags.webp",
          class: "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
          alt: "Afghanistan and American flags",
          plaiceholderClass: "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
        },
        {
          name: "refugees-truck",
          path: "/img/afghanistan-refugees-truck.jpeg",
          class: "z-[-1] fixed object-cover pointer-events-none sm:max-h-screen-80 h-screen-80 w-full",
          alt: "Afghan refugees in trucks",
          plaiceholderClass: "z-[-1] fixed object-cover pointer-events-none sm:max-h-screen-80 w-full h-screen-80",
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
