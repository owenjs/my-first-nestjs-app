import { IsNotEmpty, Length } from "class-validator";

export class CreateUserInput {
  @Length(5, 20)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
