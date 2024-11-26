import { InferSchemaType, Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    location: {
      category: {
        type: String,
        enum: ["vegetable", "fruit"],
        default: "vegetable",
      },
      aisle: { type: String, required: true },
    },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

type ProductWithTimestamps = InferSchemaType<typeof ProductSchema>;
export type Product = Partial<ProductWithTimestamps>;

export const ProductModel = model<Product>("product", ProductSchema);

export async function addNewProduct(docs: Product) {
  const newProduct = await ProductModel.create(docs);

  console.log("New product added:", newProduct._id);

  return newProduct;
}

export async function deleteById(_id: string) {
  const result = await ProductModel.deleteOne({ _id });
  if (result.deletedCount == 1) {
    console.log("deleted successfull:");
    return;
  }

  console.log("deleted failed:");
}

export async function updateProductById(_id: string, docs: Product) {
  const result = await ProductModel.updateOne({ _id }, { $set: docs });

  if (result.modifiedCount == 1) {
    console.log("updated successfull:", result);
    return;
  }

  console.log("updated failed:");
}

// Write a function to apply a discount of 10% across all fruits.
export async function applyDiscount(
  discount: number,
  type: "vegetable" | "fruit"
) {
  const result = await ProductModel.updateMany(
    { "location.category": type },
    { $mul: { price: 1 - discount / 100 } }
  );
  if (result.modifiedCount > 0) {
    console.log("applied successfull");
    return;
  }

  console.log("applied failed:");
}

// Write a function to increase the vegetables price 50 cents.
export async function increasePrice(
  amount: number,
  type: "vegetable" | "fruit"
) {
  const result = await ProductModel.updateMany(
    { "location.category": type },
    { $inc: { price: amount } }
  );
  if (result.modifiedCount > 0) {
    console.log("increased successfull");
    return;
  }

  console.log("increased failed:");
}

// Write a function to find all products with a price between a range of minimum and maximum value, with pagination.
export async function findAllProductsWithPriceRange(
  min: number,
  max: number,
  page: number = 1,
  limit: number = 10
) {
  const result = await ProductModel.find({ price: { $gte: min, $lte: max } })
    .skip((page - 1) * limit)
    .limit(limit);
  if (result) {
    console.log("successfull");
    return result;
  }

  console.log("failed:");
}

// Write a function to find all products in a specific category, with pagination.
export async function findAllProductsWithCategory(
  category: "vegetable" | "fruit",
  page: number = 1,
  limit: number = 10
) {
  const result = await ProductModel.find({ "location.category": category })
    .skip((page - 1) * limit)
    .limit(limit);
  if (result) {
    console.log("successfull");
    return result;
  }

  console.log("failed:");
}

// Write a function to find all products with an amount less than 10, with pagination.
export async function findAllProductsWithAmountLessThan(
  amount: number,
  page: number = 1,
  limit: number = 10
) {
  const result = await ProductModel.find({ amount: { $lt: amount } })
    .skip((page - 1) * limit)
    .limit(limit);
  if (result) {
    console.log("successfull");
    return result;
  }

  console.log("failed:");
}
