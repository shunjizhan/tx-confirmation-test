import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AcalaJsonRpcProvider } from '@acala-network/eth-providers';

const MANDALA_LOCAL = 'mandala-local';
const MOONBASE_LOCAL = 'moonbase-local';
const MANDALA = 'mandala';
const MOONBASE = 'moonbase';
const SHIBUYA = 'shibuya';
type Network = typeof MANDALA | typeof MANDALA_LOCAL | typeof MOONBASE | typeof SHIBUYA | typeof MOONBASE_LOCAL;

// pre-filled with public testnet tokens, feel free to use it directly ^_^
const TEST_KEY = 'a872f6cbd25a0e04a08b1e21098017a9e6194d101d75e13111f71410c59cd57f';

const NETWORK_CONFIGS: Record<Network, { key: string, ethRpc: string }> = {
  [MANDALA_LOCAL]: {
    key: TEST_KEY,
    ethRpc: 'http://localhost:8545',
  },
  [MOONBASE_LOCAL]: {
    key: '0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342',
    ethRpc: 'http://localhost:9944',
  },
  [MANDALA]: {
    key: TEST_KEY,
    ethRpc: 'https://eth-rpc-mandala.aca-staging.network',
  },
  [MOONBASE]: {
    key: TEST_KEY,
    ethRpc: 'https://rpc.api.moonbase.moonbeam.network',
  },
  [SHIBUYA]: {
    key: TEST_KEY,
    ethRpc: 'https://evm.shibuya.astar.network',
  },
}

const main = async () => {
  const network = process.env.NETWORK || MANDALA_LOCAL as Network;
  const key = NETWORK_CONFIGS[network].key;
  const rpc = NETWORK_CONFIGS[network].ethRpc;

  console.log(`testing with ${rpc} for network ${network} ...`);
  console.log('');

  const provider = network.includes('mandala')
    ? new AcalaJsonRpcProvider(rpc)
    : new JsonRpcProvider(rpc);

  const wallet = new Wallet(key, provider);

  const _printCurrentBlock = async () => `block: ${(await provider.getBlockNumber())}`;

  console.log(`✈️  sending tx ... ${await _printCurrentBlock()}`);
  const tx = await wallet.sendTransaction({
    to: wallet.address,
    value: 0,
  });

  const startBlock = await provider.getBlockNumber();
  const startTime = performance.now();

  console.log(`👌 tx sent to pool. ${startBlock}`);
  console.log(`-----------------------------------------------------------------`);

  await new Promise<void>((resolve) => {
    const i = setInterval(async () => {
      const curTime = performance.now();
      const timeUsed = (curTime - startTime) / 1000;
      console.log(`waiting for confirmation... ${await _printCurrentBlock()} - ${timeUsed.toFixed(2)}s`);
      const receipt = await provider.getTransactionReceipt(tx.hash)

      if (receipt) {
        clearInterval(i);
        const minedBlock = receipt.blockNumber;
        const endTime = performance.now();
        const diff = endTime - startTime;
        console.log(`
  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: ${minedBlock - startBlock} blocks
    ⌛ time used: ${(diff / 1000).toFixed(2)} seconds
  ------------------------------------
        `);
        resolve();
      }
    }, 1000);
  });
};

main().then(
  () => process.exit(0),
  (e) => {
    console.log(e);
    process.exit(1);
  }
);
