import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as config from "config";

let ormconfig: MysqlConnectionOptions = {
  type: "mysql",
  host: config.get("db.host"),
  port: parseInt(config.get("db.port"), 10),
  username: config.get("db.username"),
  password: config.get("db.password"),
  database: config.get("db.database"),
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true
};

if (config.get("env") === "production") {
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
