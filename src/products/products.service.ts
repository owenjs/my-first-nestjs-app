import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

  create(name: string): Promise<Product> {
    const newProduct = this.productsRepository.create({ name });

    return this.productsRepository.save(newProduct);
  }

  async update(id: string, name: string): Promise<Product> {
    const product = await this.find(id);

    if (!product) {
      return undefined;
    }

    product.name = name || product.name;

    return this.productsRepository.save(product);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.find(id);

    if (!product) {
      return undefined;
    }

    return this.productsRepository.remove(product);
  }

  async find(id: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail(id);
    } catch (e) {
      // ToDo: Log Error
      return undefined;
    }
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
