import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "../ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ProductsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
