const truncateContent = (content, wordCount) => {
  const words = content.split(" ");
  if (words.length > wordCount) {
    const truncatedWords = words.slice(0, wordCount);
    return truncatedWords.join(" ") + "...";
  }
  return content;
};

export default truncateContent;
