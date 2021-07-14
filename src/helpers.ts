import { log, Address, BigInt, BigDecimal, ethereum } from '@graphprotocol/graph-ts';

import { ERC20 } from '../generated/PoolFactory/ERC20';
import { ERC20NameBytes } from '../generated/PoolFactory/ERC20NameBytes';
import { PoolLogic} from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { Pool, Asset } from "../generated/schema";

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let BI_18 = BigInt.fromI32(18)

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue as i32);
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress)

  // try types string and bytes32 for name
  let nameValue = 'unknown'
  let nameResult = contract.try_name()
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name()
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString()
      }
    }
  } else {
    nameValue = nameResult.value
  }

  return nameValue
}

export function isNullEthValue(value: string): boolean {
  return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
}

export function instantiatePool(id: string, fundAddress: Address, event: ethereum.Event): Pool {
  let pool = Pool.load(id);
  let poolContract = PoolLogic.bind(fundAddress);
  let poolTokenDecimals = fetchTokenDecimals(fundAddress);

  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = fundAddress;
  }

  // Manager Logic
  let managerAddress = poolContract.poolManagerLogic();
  let managerContract = PoolManagerLogic.bind(managerAddress);

  // Pool Entity
  let tryPoolName = poolContract.try_name()
  if (tryPoolName.reverted) {
    log.info(
      'pool name was reverted in tx hash: {} at blockNumber: {}', 
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
  }
  let poolName = tryPoolName.value;
  pool.name = poolName;
  pool.manager = managerContract.manager();
  pool.managerName = poolContract.managerName();
  pool.decimals = poolTokenDecimals;

  let poolSupply = convertTokenToDecimal(poolContract.totalSupply(), poolTokenDecimals);
  pool.totalSupply = poolSupply;

  if (pool === null) log.error('pool is null', [pool.id])
  return pool as Pool;
}

export function instantiateAsset(pool: Pool, assetAddress: Address, event: ethereum.Event): Asset {
  let asset = Asset.load(pool.fundAddress.toHexString() + "-" + assetAddress.toHexString());
  if (!asset) {
    asset = new Asset(pool.fundAddress.toHexString() + "-" + assetAddress.toHexString())
    asset.pool = pool.id
  }
  let decimals = fetchTokenDecimals(assetAddress);
  let erc20 = ERC20.bind(assetAddress);

  // get updated balance of ERC20 at time of event
  let balance = convertTokenToDecimal(erc20.balanceOf(pool.fundAddress as Address), decimals);

  asset.time = event.block.timestamp.toI32() 
  asset.block = event.block.number.toI32()
  asset.name = fetchTokenName(assetAddress)
  asset.balance = balance; 
  asset.decimals = decimals;
  return asset as Asset;
}