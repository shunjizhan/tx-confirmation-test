## Problem
When sending tx at block `X`, it is supposed to be mined at block `X + 1`, assuming no congestion. However, there seems to be a shared issue among substrate evms: such tx is usuallly mined at block `X + 2`, which basically mysteriously skipped a block.

This causes a terrible UX. For 12s block time, expected confimation time should be 12/2 = 6s on average, which is great. However, with the current issue, expected confirmation time increases to 12/2 + 12 = 18s. This is super slow compared to these alternative evm networks, which usually confirms in less than 5s, sometimes even 2s. 

**18s confirmation time could be a huge blocker for mass adoption. Users will escape**.

## Reproduce
This repo contains a reproduce script that run with testnets for { Acala, Moonbeam, Astar }, all of these public testnets share this same issue. I am pretty sure prod networks also have the issue.

On the other hand, local node is fine: tx is confirmed in the next block as expected. So the underlying issue might be related to network or consensus, not evm itself.

TODO: does non-evm tx also have this issue?

## Run
install deps: `yarn`

run with any of the networks (for local node, checkout [Local Setup](#local-setup) section)
```
NETWORK=mandala-local yarn start
NETWORK=moonbase-local yarn start

NETWORK=mandala yarn start
NETWORK=moonbase yarn start
NETWORK=shibuya yarn start
```

## Result
### Local Nodes (confirms in \*1\* block)
**local mandala**
```
testing with http://localhost:8545 for network mandala-local ...

✈️  sending tx ... block: 260
👌 tx sent to pool. 260
-----------------------------------------------------------------
waiting for confirmation... block: 260 - 1.00s
waiting for confirmation... block: 260 - 2.00s
waiting for confirmation... block: 260 - 3.00s
waiting for confirmation... block: 260 - 4.00s
waiting for confirmation... block: 260 - 5.00s
waiting for confirmation... block: 260 - 6.01s
waiting for confirmation... block: 261 - 7.01s

  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: 1 blocks
    ⌛ time used: 7.02 seconds
  ------------------------------------
```

**local moonbase**
```
testing with http://localhost:9944 for network moonbase-local ...

✈️  sending tx ... block: 10
👌 tx sent to pool. 10
-----------------------------------------------------------------
waiting for confirmation... block: 10 - 1.00s
waiting for confirmation... block: 10 - 2.00s
waiting for confirmation... block: 10 - 3.00s
waiting for confirmation... block: 10 - 4.00s
waiting for confirmation... block: 10 - 5.00s
waiting for confirmation... block: 10 - 6.00s
waiting for confirmation... block: 10 - 7.00s
waiting for confirmation... block: 10 - 8.00s
waiting for confirmation... block: 11 - 9.00s

  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: 1 blocks
    ⌛ time used: 9.02 seconds
  ------------------------------------
```

### Public Nodes (confirms in \*2\* block)
**public mandala**
```
testing with https://eth-rpc-mandala.aca-staging.network for network mandala ...

✈️  sending tx ... block: 1177351
👌 tx sent to pool. 1177351
-----------------------------------------------------------------
waiting for confirmation... block: 1177351 - 1.00s
waiting for confirmation... block: 1177351 - 2.00s
waiting for confirmation... block: 1177351 - 3.00s
waiting for confirmation... block: 1177352 - 4.00s
waiting for confirmation... block: 1177352 - 5.01s
waiting for confirmation... block: 1177352 - 6.01s
waiting for confirmation... block: 1177352 - 7.01s
waiting for confirmation... block: 1177352 - 8.01s
waiting for confirmation... block: 1177352 - 9.01s
waiting for confirmation... block: 1177352 - 10.01s
waiting for confirmation... block: 1177352 - 11.01s
waiting for confirmation... block: 1177352 - 12.01s
waiting for confirmation... block: 1177352 - 13.01s
waiting for confirmation... block: 1177352 - 14.01s
waiting for confirmation... block: 1177352 - 15.01s
waiting for confirmation... block: 1177353 - 16.01s

  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: 2 blocks
    ⌛ time used: 16.47 seconds
  ------------------------------------
```

**public moonbase**
```
testing with https://rpc.api.moonbase.moonbeam.network for network moonbase ...

✈️  sending tx ... block: 4306498
👌 tx sent to pool. 4306498
-----------------------------------------------------------------
waiting for confirmation... block: 4306498 - 1.00s
waiting for confirmation... block: 4306498 - 2.00s
waiting for confirmation... block: 4306499 - 3.00s
waiting for confirmation... block: 4306499 - 4.00s
waiting for confirmation... block: 4306499 - 5.00s
waiting for confirmation... block: 4306499 - 6.00s
waiting for confirmation... block: 4306499 - 7.00s
waiting for confirmation... block: 4306499 - 8.00s
waiting for confirmation... block: 4306499 - 9.00s
waiting for confirmation... block: 4306499 - 10.00s
waiting for confirmation... block: 4306499 - 11.00s
waiting for confirmation... block: 4306499 - 12.01s
waiting for confirmation... block: 4306499 - 13.01s
waiting for confirmation... block: 4306499 - 14.01s
waiting for confirmation... block: 4306500 - 15.01s
waiting for confirmation... block: 4306500 - 16.01s

  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: 2 blocks
    ⌛ time used: 16.99 seconds
  ------------------------------------
  ```

**public shibuya**
```
testing with https://evm.shibuya.astar.network for network shibuya ...

✈️  sending tx ... block: 3749210
👌 tx sent to pool. 3749210
-----------------------------------------------------------------
waiting for confirmation... block: 3749210 - 1.00s
waiting for confirmation... block: 3749210 - 2.00s
waiting for confirmation... block: 3749210 - 3.00s
waiting for confirmation... block: 3749210 - 4.00s
waiting for confirmation... block: 3749210 - 5.00s
waiting for confirmation... block: 3749210 - 6.00s
waiting for confirmation... block: 3749211 - 7.00s
waiting for confirmation... block: 3749211 - 8.01s
waiting for confirmation... block: 3749211 - 9.01s
waiting for confirmation... block: 3749211 - 10.01s
waiting for confirmation... block: 3749211 - 11.01s
waiting for confirmation... block: 3749211 - 12.01s
waiting for confirmation... block: 3749211 - 13.01s
waiting for confirmation... block: 3749211 - 14.01s
waiting for confirmation... block: 3749211 - 15.01s
waiting for confirmation... block: 3749211 - 16.01s
waiting for confirmation... block: 3749211 - 17.01s
waiting for confirmation... block: 3749211 - 18.01s
waiting for confirmation... block: 3749212 - 19.01s

  ------------------------------------
    🎉 tx confirmed!
    🧱 blocks waited: 2 blocks
    ⌛ time used: 19.75 seconds
  ------------------------------------
```

## Local Setup
local mandala
```
docker run -it --rm -p 9944:9944 -p 9933:9933 ghcr.io/acalanetwork/mandala-node:sha-104e277 --dev --ws-exteal --rpc-port=9933 --rpc-external --rpc-cors=all --rpc-methods=unsafe -levm=debug --pruning=archive

docker run -p 8545:8545 acala/eth-rpc-adapter:2.6.8 --endpoint ws://host.docker.internal:9944
```

local moonbase
```
docker run --rm --name moonbeam_development -p 9944:9944 \
purestake/moonbeam:v0.31.1 \
--dev --ws-external --rpc-external --sealing 12000
```