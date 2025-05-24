import "reflect-metadata";
import dotenv from "dotenv";
import app from "./src/app";
const PORT = process.env.PORT || 3000;
dotenv.config();
async function bootstrap() {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
