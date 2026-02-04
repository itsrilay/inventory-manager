const snakeToCamel = (str: string) =>
  str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

const camelizeRow = (row: any) =>
  Object.fromEntries(
    Object.entries(row).map(([key, val]) => [snakeToCamel(key), val])
  );
export const handleSnakeToCamel = (rows: any[]) => rows.map(camelizeRow);

export {
  camelizeRow,
};