require("express-async-errors");
require('dotenv/config');

const migrationsRun = require("./dataBase/sqlite/migrations");
const uploadConfig = require("./configs/upload");


const AppError = require("./utils/AppError");
const express = require("express");


const routes = require("./routes");
const cors = require("cors");
migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));


app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }



  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  
});
