const generateAuthHash = (): string => {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
export default generateAuthHash;
