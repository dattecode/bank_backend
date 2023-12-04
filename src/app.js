import express, { urlencoded } from "express";
import { router } from "./routes/routes.js";
import { AppError } from "./common/errors/appErrors.js";
import { globalErrorHandler } from "./common/errors/error.controler.js";
import morgan from "morgan";

const app = express();

//configuracion predeterminada
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("DEV"))

//rutas, respuesta al usuario
app.use("/api/v1", router);

//errores, control de errores
app.all("*", (req, res, next) => {
  return next(new AppError(`this url is not defined: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler)

export default app;
