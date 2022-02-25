import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as config from "config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.get("port") || 3000);
}
bootstrap();
