export const useFormat = () => {
  const objectValuesToString = (obj: unknown[]): string[] => {
    return Object.values(obj).flat().join(",").split(",");
  };

  const createQuery = <T>(props: T) => {
    const arrayQuery = Object.entries(props)
      .flatMap(([key, value]) => {
        return Array.isArray(value)
          ? value.map((e) => {
              return [`${key}[]`, e];
            })
          : [[key, value]];
      })
      .filter((v) => v.length > 0);

    return new URLSearchParams(arrayQuery).toString();
  };

  return {
    objectValuesToString,
    createQuery,
  };
};
