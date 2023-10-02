const sendAd = async (ctx, provider, options) => {
  const {
    text,
    title,
    body,
    mediaType,
    thumbnailUrl,
    sourceUrl,
    renderLargerThumbnail,
  } = options;

  await provider.vendor.sendMessage(`${ctx.from}@c.us`, {
    text,
    contextInfo: {
      externalAdReply: {
        title,
        body,
        mediaType, //VIDEO - IMAGE - NONE
        renderLargerThumbnail,
        thumbnailUrl,
        sourceUrl,
      },
    },
  });
};

module.exports = sendAd;