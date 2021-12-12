import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

async function main() {
  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  await app.listen(Number(process.env.PORT || 3000), '0.0.0.0');

  /** @type {import('net').AddressInfo} */
  const address = app.server.address();
  console.log(`Listening on ${address.address}:${address.port}`);
}

main().catch(console.error);
