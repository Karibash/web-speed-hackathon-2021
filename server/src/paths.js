import path from 'path';

const WEBPACK_CONFIG_PATH = path.resolve(__dirname, '../webpack.config.js');
const PUBLIC_PATH = path.resolve(__dirname, '../../public');
const UPLOAD_PATH = path.resolve(__dirname, '../../upload');
const CLIENT_DIST_PATH = path.resolve(__dirname, '../../dist/client');
const DATABASE_PATH = '/tmp/database.sqlite';

export { WEBPACK_CONFIG_PATH, PUBLIC_PATH, CLIENT_DIST_PATH, DATABASE_PATH, UPLOAD_PATH };
