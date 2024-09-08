const config = require('../config');
const MODE = process.env.MODE;
const apiServerConfig = config[MODE].apiServer;

const startApi = async() => {
    const express = require('express');
    const app = express();

    // app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'public')));

    const host = apiServerConfig.host;
    const port = process.env.API_PORT || apiServerConfig.port;

    if (MODE === 'client') {
        const { apiStore } = require('../client/apiStore');
        app.post('/store', apiStore);

        app.post('/api/assignments', async(req, res) => {
            const data = req.body.jwk;

            const jwk = atob(data);
            const { initWallet } = require('../wallet');
            const wallet = await initWallet(jwk);

            const getClientInstance = require('../client');
            const client = getClientInstance({ wallet });

            const assignments = await client.getAssignments();
            res.send({ assignments: assignments });
        });

        app.post('/api/assignments/:id', async(req, res) => {
            const data = req.body.jwk;

            const jwk = atob(data);
            const { initWallet } = require('../wallet');
            const wallet = await initWallet(jwk);

            const getClientInstance = require('../client');
            const client = getClientInstance({ wallet });

            const placements = await client.getAssignments(req.params.id);
            res.send({ placements: placements });
        });

        app.post('/api/placements/:id', async(req, res) => {
            const data = req.body.jwk;

            const jwk = atob(data);
            const { initWallet } = require('../wallet');
            const wallet = await initWallet(jwk);

            const getClientInstance = require('../client');
            const client = getClientInstance({ wallet });
            
            const placement = await client.getPlacements(req.params.id);
            res.send({ placement: placement });
        });
    }

    if (MODE === 'provider') {
    }

    app.get('/', (req, res) => {
        res.send('Hello from ' + MODE + ' API!')
    });

    app.listen(port, host, () => {
        console.log(`API app listening on http://${host}:${port}`);
    });
}

module.exports = {
    startApi
}
