import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

let ormconfig: MysqlConnectionOptions = {
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "password",
  database: "db",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true
};

if (process.env.NODE_ENV === "production") {
  ormconfig = {
    ...ormconfig,
    synchronize: false,
    migrations: ["dist/src/db/migrations/*.js"],
    cli: {
      migrationsDir: "src/db/migrations"
    }
  };
}

export default ormconfig;
