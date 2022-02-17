import { Injectable } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(name: string): string {
    const product = new Product(Math.random().toString(), name);

    this.products.push(product);

    return product.id;
  }

  update(id: string, name: string) {
    const [product, index] = this.findProduct(id);

    if (index === -1) return undefined;

    this.products[index] = {
      ...product,
      name: name || product.name
    };

    return {
      ...this.products[index]
    };
  }

  delete(id: string) {
    const [, index] = this.findProduct(id);

    return index !== -1 ? this.products.splice(index, 1) : undefined;
  }

  find(id: string) {
    const [product, index] = this.findProduct(id);

    return index !== -1 ? { ...product } : undefined;
  }

  findAll(): Product[] {
    return [...this.products];
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(p => p.id === id);
    const product = this.products[productIndex];
    return [product, productIndex];
  }
}
