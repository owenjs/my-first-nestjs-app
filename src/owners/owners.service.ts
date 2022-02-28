import { Injectable } from "@nestjs/common";
import { CreateOwnerInput } from "./dto/create-owner.input";
import { UpdateOwnerInput } from "./dto/update-owner.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Owner } from "./entities/owner.entity";

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);

    return this.ownerRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({
      relations: ["pets"]
    });
  }

  async findOne(id: number): Promise<Owner> {
    try {
      return await this.ownerRepository.findOneOrFail(id, {
        relations: ["pets"]
      });
    } catch (e) {
      // ToDo: Log Error
      return undefined;
    }
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
