export const getCleanedFilename = (originalFilename) => {
  const regex = /^\d+(.*)$/;
  const match = originalFilename.match(regex);
  if (match) {
    return match[1].trim();
  } else {
    throw new Error("Invalid file name format");
  }
};
