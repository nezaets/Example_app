export const createEntities = <T>(num: number, creator: (num: number) => T): T[] => {
  const entities = [];
  let i = 0;
  while (i < num) {
    entities.push(creator(1));
    i++;
  }

  return entities;
};
