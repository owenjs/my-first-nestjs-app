import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);

    const userInfo: CreateUserInput = {
      ...createUserInput,
      password: hashedPassword
    };

    const newUser = this.usersRepository.create(userInfo);

    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: User["username"]): Promise<User | undefined> {
    try {
      return this.usersRepository.findOneOrFail({ username });
    } catch (e) {
      return undefined;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ["id", "username"] });
  }
}
