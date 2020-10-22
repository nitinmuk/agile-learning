export default {
  getBriefTitle: title =>
    title.length > 20 ? `${title.substring(0, 20)}...` : title,
  getBriefContent: content =>
    content.length > 70 ? `${content.substring(0, 70)}...` : content
};
