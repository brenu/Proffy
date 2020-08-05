import knex from "knex";
import path from "path";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  // Exclusivo do sqlite, pois ele não têm um padrão para indefinições
  useNullAsDefault: true,
});

export default db;
