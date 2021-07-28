export const enumToList = (enumerable: any) =>
  Object.keys(enumerable)
    .filter((v) => !parseInt(v))
    .slice(1);
