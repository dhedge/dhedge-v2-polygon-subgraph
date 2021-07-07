import { ERC20 } from '../generated/UniswapV2RouterGuard/ERC20';
import { PoolLogic,} from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { Exchange as ExchangeEvent } from '../generated/UniswapV2RouterGuard/UniswapV2RouterGuard';
import { 
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName,
} from "../src/helpers";
import {
  Asset,
  Exchange,
  Pool
} from '../generated/schema';
import { dataSource, log, Address } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  // PoolLogic
  let pool = Pool.load(event.params.fundAddress.toHexString());
  let poolContract = PoolLogic.bind(event.params.fundAddress);
  let poolTokenDecimals = fetchTokenDecimals(event.params.fundAddress);

  if (!pool) {
    pool = new Pool(event.params.fundAddress.toHexString());
    pool.fundAddress = event.params.fundAddress;
  }

  // Manager Logic
  let managerAddress = poolContract.poolManagerLogic();
  let managerContract = PoolManagerLogic.bind(managerAddress);

  let trySourceAssetBalance = managerContract.try_assetBalance(event.params.sourceAsset);
  if (trySourceAssetBalance.reverted) {
    log.info(
      'SourceAssetBalance was reverted in tx hash {} at block number: {}',
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
    return;
  }
  // event.params.valueDeposited doesn't exist, so cannot use managerContract.assetValue(asset, amount)

  // Create or Update Asset entity for the 2 tokens being traded  
  let asset0 = Asset.load(pool.fundAddress.toHexString() + "-" + event.params.dstAsset.toHexString())
  if (!asset0) {
    asset0 = new Asset(pool.fundAddress.toHexString() + "-" + event.params.dstAsset.toHexString())
    asset0.pool = pool.id
  }
  let asset0Decimals = fetchTokenDecimals(event.params.dstAsset);
  let erc20Contract = ERC20.bind(event.params.dstAsset);
  let fundAddress = Address.fromString(event.params.fundAddress.toHexString());
  let currentFormattedBalance = convertTokenToDecimal(erc20Contract.balanceOf(fundAddress), asset0Decimals);
  let timestamp0 = event.block.timestamp.toI32()

  asset0.time = timestamp0
  asset0.block = event.block.number.toI32()
  asset0.name = fetchTokenName(event.params.dstAsset)
  asset0.balance = currentFormattedBalance; 
  // asset.value = assetValue;
  asset0.decimals = asset0Decimals;
  asset0.save();


  let asset1 = Asset.load(pool.fundAddress.toHexString() + "-" + event.params.sourceAsset.toHexString())
  if (!asset1) {
    asset1 = new Asset(pool.fundAddress.toHexString() + "-" + event.params.sourceAsset.toHexString())
    asset1.pool = pool.id
  }
  let asset1Decimals = fetchTokenDecimals(event.params.sourceAsset);
  let erc20ContractB = ERC20.bind(event.params.sourceAsset);
  let currentFormattedBalanceB = convertTokenToDecimal(erc20ContractB.balanceOf(fundAddress), asset1Decimals);
  let timestampAsset1 = event.block.timestamp.toI32() 

  asset1.time = timestampAsset1 
  asset1.block = event.block.number.toI32()
  asset1.name = fetchTokenName(event.params.sourceAsset)
  asset1.balance = currentFormattedBalanceB; 
  asset1.decimals = asset1Decimals;
  asset1.save();

  // Pool Entity
  let tryPoolName = poolContract.try_name()
  if (tryPoolName.reverted) {
    log.info(
      'pool name was reverted in tx hash: {} at blockNumber: {}', 
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
    return;
  }
  let poolName = tryPoolName.value;
  pool.name = poolName;
  pool.manager = managerContract.manager();
  pool.managerName = poolContract.managerName();

  let poolSupply = convertTokenToDecimal(poolContract.totalSupply(), poolTokenDecimals);
  pool.totalSupply = poolSupply;
  pool.save();

  // Exchange Entity
  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  entity.save();
}
