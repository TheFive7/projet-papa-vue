module.exports = {
  // HOST: 'localhost',
  HOST: 'postgres-test',
  USER: 'postgres',
  PASSWORD: '2412',
  DB: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
