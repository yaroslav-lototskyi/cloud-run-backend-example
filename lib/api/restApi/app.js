import express       from 'express';
import { promisify } from '../../../packages.mjs';
import middlewares   from './middlewares.mjs';
import controllers   from './controllers';

const fileUpload        = middlewares.fileUpload;

const app = express();

const router = express.Router();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(fileUpload().any());
app.use('/api/v1', router);

// Talks
router.post('/talks',        controllers.talks.create);
router.get('/talks/:id',    controllers.talks.show);
router.get('/talks',         controllers.talks.list);

let server = null;

export function start({ appPort }) {
    server = app.listen(appPort, () => {
        const { port, address } = server.address();

        global.REST_API_PORT = port;
        console.info(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
    });

    server.closeAsync = promisify(server.close);
}

export async function stop() {
    if (!server) return;
    console.info('[RestApiApp] Closing server');
    await server.closeAsync();
}

export default app;
