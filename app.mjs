import AppProvider from './lib/AppProvider.mjs';

async function main() {
    const provider = new AppProvider();

    provider.initApp();
    provider.start();
}

main().catch((err) => {
    console.error(err);

    process.exit(1);
});
