export const getPlayerName = (name: string, nickname: string) => {
  const [firstName, lastName] = name.split(" ");

  return `${firstName} "${nickname}" ${lastName}`;
};
