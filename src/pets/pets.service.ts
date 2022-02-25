import { Injectable } from "@nestjs/common";
import { Pet } from "./entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePetInput } from "./dto/create-pet.input";
import { OwnersService } from "../owners/owners.service";
import { Owner } from "../owners/entities/owner.entity";

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>, private ownerService: OwnersService) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput);

    return this.petRepository.save(newPet);
  }

  async find(id: number): Promise<Pet> {
    try {
      return await this.petRepository.findOneOrFail(id);
    } catch (e) {
      // ToDo: Log Error
      return undefined;
    }
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
