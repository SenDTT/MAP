import mongoose from "mongoose";
import {
  addNewProduct,
  applyDiscount,
  deleteById,
  findAllProductsWithAmountLessThan,
  findAllProductsWithCategory,
  findAllProductsWithPriceRange,
  increasePrice,
  Product,
  ProductModel,
  updateProductById,
} from "../models/product";

const testProduct: Product = {
  name: "Test Product",
  price: 20,
  amount: 100,
  location: {
    category: "vegetable",
    aisle: "A1",
  },
};

const testProducts: Product[] = [
  {
    name: "Test Product 001",
    price: 20,
    amount: 100,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product - fruit 001",
    price: 20,
    amount: 100,
    location: {
      category: "fruit",
      aisle: "A1",
    },
  },
  {
    name: "Test Product 002",
    price: 20,
    amount: 100,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product 003",
    price: 30,
    amount: 100,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product 004",
    price: 20,
    amount: 100,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product 005",
    price: 50,
    amount: 100,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product 006",
    price: 20,
    amount: 10,
    location: {
      category: "vegetable",
      aisle: "A1",
    },
  },
  {
    name: "Test Product - fruit 002",
    price: 20,
    amount: 30,
    location: {
      category: "fruit",
      aisle: "A1",
    },
  },
  {
    name: "Test Product - fruit 003",
    price: 80,
    amount: 100,
    location: {
      category: "fruit",
      aisle: "A1",
    },
  },
  {
    name: "Test Product - fruit 004",
    price: 100,
    amount: 150,
    location: {
      category: "fruit",
      aisle: "A1",
    },
  },
];

const runProductsTests = async (connectDB: () => Promise<any>) => {
  await connectDB();
  await ProductModel.deleteMany({});
  console.log("Cleared products collection");

  await addNewProduct(testProduct);

  const addedProduct = await ProductModel.findOne({ name: "Test Product" });

  if (addedProduct) {
    const productId = addedProduct._id.toString();

    await updateProductById(productId, { price: 25 });

    await deleteById(productId);
  } else {
    console.error("Product not found for testing");
  }

  testProducts.map(async (prod) => {
    await addNewProduct(prod);
  });

  await applyDiscount(10, "fruit");

  const products1 = await findAllProductsWithCategory("fruit", 1, 10);
  console.log("fruits:", products1);

  await increasePrice(0.5, "vegetable");

  const products01 = await findAllProductsWithCategory("vegetable", 1, 10);
  console.log("Vegetables after increasePrice:", products01);

  const products = await findAllProductsWithPriceRange(10, 30, 1, 10);
  console.log("Products within price range:", products);

  const products2 = await findAllProductsWithCategory("vegetable", 1, 10);
  console.log("Vegetables:", products2);

  const products3 = await findAllProductsWithAmountLessThan(50, 1, 10);
  console.log("Products with less than 50 amount:", products3);

  mongoose.connection.close();
};

export default runProductsTests;
