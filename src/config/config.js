import dotenv from "dotenv";
dotenv.config();

export default {
  secret_string: process.env.SECRET_STRING,
  db_port: process.env.PORT,
  db_name: process.env.DB_DATABASE,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_database_port: process.env.DB_PORT,
  db_dialect: process.env.DB_DIALECT,
};
