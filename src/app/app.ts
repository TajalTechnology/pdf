import config from "config";
import utils from "../common/services/utils";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../app/common/utils/swagger.json";
const port = config.get<number>("port");

/* ----------------------------------- */
/* Initializing Express App */
/* ----------------------------------- */
var appLocals = {
  baseUri: "/api/",
  dirname: __dirname,
};

export var app: any = utils.initApp(appLocals);

app.use(function (
  req: any,
  res: { header: (arg0: string, arg1: string) => void },
  next: () => void
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-refresh, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

/* ----------------------------------- */
/* Loading pre-required local service */
/* ----------------------------------- */
utils.localService("mongoose", app);
utils.middleware("body-parser", app);
utils.middleware("api-response", app);
utils.middleware("routes", app);
utils.middleware("try-catch", app);

//swagger implementation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
