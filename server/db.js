const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "samuele2512",
    host: "host.docker.internal",
    port: 5432,
    database: "todo",
})

module.exports = pool
