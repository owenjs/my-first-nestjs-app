import { Args, Mutation, Query, Resolver, Int, ResolveField, Parent } from "@nestjs/graphql";
import { PetsService } from "./pets.service";
import { Pet } from "./entities/pet.entity";
import { CreatePetInput } from "./dto/create-pet.input";
import { Owner } from "../owners/entities/owner.entity";

@Resolver(of => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(returns => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(returns => Pet)
  pet(@Args("id", { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.find(id);
  }

  @ResolveField(returns => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Mutation(returns => Pet)
  createPet(@Args("createPetInput") createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }
}
