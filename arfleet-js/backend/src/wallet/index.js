const fs = require('fs');
const arweave = require('../arweave');
const utils = require('../utils');
const config = require('../config');

class Wallet {
    constructor(jwk) {
        this._address = null;
        this._jwk = jwk;
    }

    readPrivateKey() {
        return this._jwk;
    }

    async getAddress() {
        if (!this._address) {
            this._address = await arweave.wallets.jwkToAddress(JSON.parse(this.readPrivateKey()));
        }
        return this._address;
    }

    async sign(data) {
        const jwk = JSON.parse(this.readPrivateKey());
        const signer = await arweave.wallets.jwkToSigner(jwk);
        return signer.sign(data);
    }
}

const initWallet = async (jwk) => {
    return new Wallet(jwk);
};

module.exports = {
    initWallet
}