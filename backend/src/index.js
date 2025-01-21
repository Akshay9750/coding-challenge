import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/connection.js";
import { seedDatabase } from "./db/productQueries.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(async () => {
    try {
      await seedDatabase();
      app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(" Error while seeding database", error);
    }
  })
  .catch((error) => console.log(error));
