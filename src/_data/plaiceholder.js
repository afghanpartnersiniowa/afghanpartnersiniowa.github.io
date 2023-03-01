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
    outputDir:
      process.env.NODE_ENV === "preview" ? "./preview/img/" : "./public/img/",
  });

  const imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  if (!alt) {
    imageAttributes.alt = "";
    imageAttributes.role = "presentation";
  }

  return Image.generateHTML(metadata, imageAttributes);
}

const defaultClass = "z-[-1] absolute inset-0 filter w-full h-full";

async function imageWithPlaiceholderBase64(
  src,
  cls,
  alt,
  sizes,
  plaiceholderClass
) {
  const image = await imageShortcode(src, cls, alt, sizes);
  const { base64 } = await getPlaiceholder(src, { dir: "./src/static" });

  const attrs = alt ? `alt="${alt}"` : `role="presentation"`;

  return `
    <img
      ${attrs}
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
          class:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
          plaiceholderClass:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
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
          class:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
          plaiceholderClass:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
        },
        {
          name: "refugeesTruck",
          path: "/img/afghanistan-refugees-truck.jpeg",
          class:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
          plaiceholderClass:
            "z-[-1] fixed object-cover pointer-events-none h-screen-80 sm:h-auto w-full",
        },
        {
          name: "kabul",
          path: "/img/kabul.webp",
          class:
            "z-[-1] fixed object-cover pointer-events-none min-h-screen-60 sm:h-auto w-full",
          plaiceholderClass:
            "z-[-1] fixed object-cover pointer-events-none min-h-screen-60 sm:h-auto w-full",
        },
        ...profilePictures,
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

const profilePictures = [
  {
    name: "blankProfile",
    path: "/img/blank-profile-picture.webp",
    alt: "Blank profile picture of a silhouette",
  },
  {
    name: "safi",
    path: "/img/shir-agha-safi.png",
    alt: "Profile picture of Shir Agha Safi",
  },
  {
    name: "soniyaAzhman",
    path: "/img/soniya-azhman.png",
    alt: "Profile picture of Soniya Azhman",
  },
  {
    name: "ferozRasheedzai",
    path: "/img/feroz-rasheedzai.png",
    alt: "Profile picture of Feroz Rasheedzai",
  },
].map((profilePic) => ({
  ...profilePic,
  class:
    "shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]",
  plaiceholderClass:
    "shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 w-[150px] max-w-[150px]",
}));
