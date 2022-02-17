import { Body, Controller, Get, Param, Patch, Post, NotFoundException, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): object {
    return {
      data: this.productsService.findAll()
    };
  }

  @Get(":id")
  getProductById(@Param("id") id: string): object {
    const product = this.productsService.find(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return {
      data: product
    };
  }

  @Post()
  postProduct(@Body("name") name: string): object {
    const id = this.productsService.create(name);

    return {
      data: id
    };
  }

  @Patch(":id")
  updateProduct(@Param("id") id: string, @Body("name") name: string): object {
    const updatedProduct = this.productsService.update(id, name);

    if (!updatedProduct) {
      throw new NotFoundException("Product not found");
    }

    return {
      data: updatedProduct
    };
  }

  @Delete(":id")
  deleteProduct(@Param("id") id: string) {
    const deleteProduct = this.productsService.delete(id);

    if (!deleteProduct) {
      throw new NotFoundException("Product not found");
    }

    return deleteProduct;
  }
}
