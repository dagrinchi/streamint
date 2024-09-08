const config = require('../config');
const utils = require('../utils');
const deployer = require('../client/deployer');

const apiStore = async(req, res) => {
    try {
        const data = req.body.jwk;

        const jwk = atob(data);
        const { initWallet } = require('../wallet');
        const wallet = await initWallet(jwk);

        const getClientInstance = require('../client');
        const client = getClientInstance({ wallet });
        
        const path = req.body.path;
        console.log("Storing path:", path);

        const storeInfo = await deployer.store(path);
        res.json({ assignmentId: storeInfo.hash, message: "Queued for storage: " + path });
        // res.send("Queued for storage: " + path);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error storing path: " + error.message);
    }
}

module.exports = {
    apiStore
};
