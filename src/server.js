import app from "./app.js";
import { authenticadted, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/envioroments.js";

async function main() {
  try {
    await authenticadted();
    await syncUp();
  } catch (error) {
    console.log();
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`server running on port: ${envs.PORT}`);
});
