/* eslint-disable */
require = require('esm')(module);
const  AppProvider = require('./lib/AppProvider.js');

async function main() {
    const provider = new AppProvider.default();

    provider.initApp();
    provider.start();
}

main().catch((err) => {
    console.error(err);

    process.exit(1);
});
