export const useFormat = () => {
  const objectValuesToString = (obj: unknown[]): string[] => {
    return Object.values(obj).flat().join(",").split(",");
  };

  return {
    objectValuesToString,
  };
};
