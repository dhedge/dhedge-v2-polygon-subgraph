import { ERC20 } from '../generated/templates/PoolLogic/ERC20';
import { PoolLogic } from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { 
  Stake as StakeEvent,
  Unstake as UnstakeEvent,
  Claim as ClaimEvent
} from '../generated/SushiMiniChefV2Guard/SushiMiniChefV2Guard';
import { 
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName,
  instantiatePool,
  instantiateAsset
} from "../src/helpers";
import {
  Pool,
  Stake,
  Unstake,
  Claim
} from '../generated/schema';
import { dataSource, log, Address } from '@graphprotocol/graph-ts';

export function handleStake(event: StakeEvent): void {
  let entity = new Stake(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.fundAddress = event.params.fundAddress
  entity.asset = event.params.asset
  entity.stakingContract = event.params.stakingContract
  entity.amount = event.params.amount
  entity.time = event.block.timestamp.toI32()
  entity.save()
}

export function handleUnstake(event: UnstakeEvent): void {
  let entity = new Unstake(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.fundAddress = event.params.fundAddress
  entity.asset = event.params.asset
  entity.stakingContract = event.params.stakingContract
  entity.amount = event.params.amount
  entity.time = event.block.timestamp.toI32()
  entity.save()
}

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.fundAddress = event.params.fundAddress
  entity.stakingContract = event.params.stakingContract
  entity.time = event.block.timestamp.toI32()
  entity.save()
}