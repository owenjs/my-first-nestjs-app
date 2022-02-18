import { Body, Controller, Get, Param, Patch, Post, NotFoundException, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<object> {
    const products = await this.productsService.findAll();

    return {
      data: products
    };
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<object> {
    const product = await this.productsService.find(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return {
      data: product
    };
  }

  @Post()
  async postProduct(@Body("name") name: string): Promise<object> {
    const newProduct = await this.productsService.create(name);

    return {
      data: newProduct
    };
  }

  @Patch(":id")
  async updateProduct(@Param("id") id: string, @Body("name") name: string): Promise<object> {
    const updatedProduct = await this.productsService.update(id, name);

    if (!updatedProduct) {
      throw new NotFoundException("Product not found");
    }

    return {
      data: updatedProduct
    };
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string): Promise<object> {
    const deleteProduct = await this.productsService.delete(id);

    if (!deleteProduct) {
      throw new NotFoundException("Product not found");
    }

    return deleteProduct;
  }
}
