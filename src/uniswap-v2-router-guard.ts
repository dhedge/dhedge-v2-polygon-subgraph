import { ERC20 } from '../generated/UniswapV2RouterGuard/ERC20';
import { PoolLogic } from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { 
  Exchange as ExchangeEvent,
  AddLiquidity as AddLiquidityEvent,
  RemoveLiquidity as RemoveLiquidityEvent
} from '../generated/UniswapV2RouterGuard/UniswapV2RouterGuard';
import { 
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName,
  instantiatePool,
  instantiateAsset
} from "../src/helpers";
import {
  AddLiquidity,
  Asset,
  Exchange,
  Pool,
  RemoveLiquidity
} from '../generated/schema';
import { dataSource, log, Address } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);

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

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  entity.save();
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  let entity = new AddLiquidity(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);
  let tokenA = instantiateAsset(pool, event.params.tokenA, event);
  let tokenB = instantiateAsset(pool, event.params.tokenB, event);  
  let pair = instantiateAsset(pool, event.params.pair, event);

  // since there's no tokenAmount, snapshot would get the Pool's last snapshot balance
  // let newBalance = tokenA.balance.minus(tokenAmountWithdrawn);

  tokenA.save();
  tokenB.save();
  pair.save();
  pool.save();

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.tokenA = event.params.tokenA;
  entity.tokenB = event.params.tokenB;
  entity.pair = event.params.pair;
  entity.time = event.block.timestamp.toI32();
  entity.block = event.block.number.toI32();
  entity.save();
}

export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let entity = new RemoveLiquidity(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.fundAddress = event.params.fundAddress;
  entity.tokenA = event.params.tokenA;
  entity.tokenB = event.params.tokenB;
  entity.pair = event.params.pair;
  entity.liquidity = event.params.liquidity;
  entity.time = event.block.timestamp.toI32();
  entity.block = event.block.number.toI32();
  entity.save();
}