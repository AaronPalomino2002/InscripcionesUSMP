const { Pool } = require("pg");

const pool = new Pool({
  user: "dbinscritos_user",
  host: "dpg-d1etn3mr433s73fko020-a.oregon-postgres.render.com",
  database: "dbinscritos",
  password: "8AA6ZcVNnNqmqnK3xczlFbLcL5tWbtLO",
  port: 5432,
  ssl: true, // asegúrate de usar esto para Render
});

module.exports = pool;
