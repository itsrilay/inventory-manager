const snakeToCamel = (str) =>
  str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

const camelizeRow = (row) =>
  Object.fromEntries(
    Object.entries(row).map(([key, val]) => [snakeToCamel(key), val])
  );
const handleSnakeToCamel = (rows) => rows.map(camelizeRow);

module.exports = {
  handleSnakeToCamel,
  camelizeRow,
};
