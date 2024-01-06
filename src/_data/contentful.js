const { AssetCache } = require("@11ty/eleventy-fetch");
const slugify = require("@sindresorhus/slugify");
const { prodUrl } = require("./env");

const { BLOCKS, INLINES, MARKS } = require("@contentful/rich-text-types");
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

/**
 * @typedef {{title: string, slug: string, date: Date, [x:string]:any}} Page
 */

module.exports = async function () {
  const asset = new AssetCache("contentful");

  if (asset.isCacheValid("1d")) {
    return asset.getCachedValue();
  }

  const pages = await getPages();

  const contentfulData = {
    pages,
  };

  await asset.save(contentfulData, "json");
  return contentfulData;
};

const paragraphClass = "mb-6";
const contentfulOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<span class="font-bold">${text}</span>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) =>
      `<p class="${paragraphClass}">${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node, next) =>
      `<h1 class="text-2xl sm:text-4xl">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) =>
      `<h2 class="text-xl sm:text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) =>
      `<h3 class="text-lg sm:text-xl">${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node, next) =>
      `<p class="text-lg">${next(node.content)}</p>`,
    [INLINES.HYPERLINK]: (node, next) =>
      `<a class="text-secondary-500" href="${node.data.uri}">${next(node.content)}</a>`,
  },
};

/**
 *
 * @returns {Promise<{[x: string]: Page>}}
 */
async function getPages() {
  try {
    const response = await client.getEntries({
      content_type: "page",
      order: "sys.createdAt",
    });
    const pages = response.items.reduce(function (acc, { sys, fields }) {
      const changedFields = {};
      for (const [key, val] of Object.entries(fields)) {
        if (key.startsWith("paragraph")) {
          changedFields[key] = documentToHtmlString(
            val,
            contentfulOptions
          ).replace(new RegExp("&lt;br/?&gt;", "g"), "<br/>");
        } else {
          changedFields[key] = val;
        }
      }
      const name = fields.title.replace(" ", "").toLowerCase();
      acc[name] = {
        ...changedFields,
        date: new Date(sys.updatedAt),
      };
      return acc;
    }, {});

    return pages;
  } catch (e) {
    console.error("Error trying to retrieve contentful pages", e);
  }
}
