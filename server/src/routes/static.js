import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: true,
    maxAge: '100y',
    immutable: true,
    lastModified: true,
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    etag: true,
    maxAge: '100y',
    immutable: true,
    lastModified: true,
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: true,
    maxAge: '100y',
    immutable: true,
    lastModified: true,
  }),
);

export { router as staticRouter };
