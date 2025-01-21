import mongoose from "mongoose";
import axios from "axios";

const seedDatabase = async () => {
  try {
    const collection = mongoose.connection.collection("products");
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log("Database already exists in collection. Seeding skipped");
      return;
    }
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    console.log("Seeding database", response);

    const productsToInsert = response.data.map((product) => {
      const date = product.dateOfSale
        ? new Date(product.dateOfSale)
        : new Date(); // Fallback to current date if dateOfSale is missing

      return {
        ...product,
        sold: product.sold || false,
        dateOfSale: product.dateOfSale || new Date().toISOString(),
        month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          date
        ),
      };
    });
    const result = await collection.insertMany(productsToInsert);
    console.log(`Successfully inserted ${result.insertedCount} documents`);
  } catch (error) {
    console.log(" Error while seeding database", error);
  }
};

export { seedDatabase };
