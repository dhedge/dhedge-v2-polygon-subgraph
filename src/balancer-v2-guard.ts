import {
  ExchangeFrom as ExchangeFromEvent,
  ExchangeTo as ExchangeToEvent,
  JoinPool as JoinPoolEvent,
  ExitPool as ExitPoolEvent,
} from '../generated/BalancerV2Guard/BalancerV2Guard';
import {
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName,
  instantiatePool,
  instantiateAsset,
} from '../src/helpers';
import {
  ExchangeFrom,
  ExchangeTo,
  JoinPool,
  ExitPool,
} from '../generated/schema';
import { dataSource, log, Address, Bytes } from '@graphprotocol/graph-ts';

export function handleExchangeFrom(event: ExchangeFromEvent): void {
  let entity = new ExchangeFrom(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  entity.save();
}

export function handleExchangeTo(event: ExchangeToEvent): void {
  let entity = new ExchangeTo(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.dstAsset = event.params.dstAsset;
  entity.dstAmount = event.params.dstAmount;
  entity.time = event.params.time;
  entity.save();
}

export function handleJoinPool(event: JoinPoolEvent): void {
  let entity = new JoinPool(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.poolId = event.params.poolId;

  let assetArray: Array<Bytes> = [];

  let assets = event.params.assets;
  for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    assetArray.push(asset);
  }

  entity.assets = assetArray;

  entity.time = event.params.time;
  entity.save();
}

export function handleExitPool(event: ExitPoolEvent): void {
  let entity = new ExitPool(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.poolId = event.params.poolId;

  let assetArray: Array<Bytes> = [];

  let assets = event.params.assets;
  for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    assetArray.push(asset);
  }

  entity.assets = assetArray;

  entity.time = event.params.time;
  entity.save();
}
