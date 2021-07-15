import { ERC20 } from '../generated/PoolFactory/ERC20';
import {
  Approval as ApprovalEvent,
  Deposit as DepositEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent,
  PoolManagerLogicSet as PoolManagerLogicSetEvent,
  PoolPrivacyUpdated as PoolPrivacyUpdatedEvent,
  TransactionExecuted as TransactionExecutedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
  PoolLogic,
  WithdrawalWithdrawnAssetsStruct
} from '../generated/templates/PoolLogic/PoolLogic';
import { 
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName,
  instantiatePool,
  instantiateAsset,
} from "../src/helpers";
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import {
  Approval,
  Deposit,
  ManagerFeeMinted,
  PoolManagerLogicSet,
  PoolPrivacyUpdated,
  TransactionExecuted,
  Transfer,
  Withdrawal,
  Pool,
  Asset,
  AssetsWithdrawn,
} from '../generated/schema';
import { dataSource, log, Address } from '@graphprotocol/graph-ts';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);
  pool.save();
  
  // load of create asset & update Pool's balance for asset
  let asset = instantiateAsset(pool, event.params.assetDeposited, event);
  asset.save();

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = pool.totalSupply;
  entity.investor = event.params.investor;
  entity.assetDeposited = event.params.assetDeposited;
  entity.valueDeposited = event.params.valueDeposited;
  entity.fundTokensReceived = event.params.fundTokensReceived;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.block = event.block.number.toI32()
  entity.save();
}

export function handleManagerFeeMinted(event: ManagerFeeMintedEvent): void {
  let entity = new ManagerFeeMinted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.available = event.params.available;
  entity.daoFee = event.params.daoFee;
  entity.managerFee = event.params.managerFee;
  entity.tokenPriceAtLastFeeMint = event.params.tokenPriceAtLastFeeMint;
  entity.save();
}

export function handlePoolManagerLogicSet(event: PoolManagerLogicSetEvent): void {
  let entity = new PoolManagerLogicSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.poolManagerLogic = event.params.poolManagerLogic;
  entity.from = event.params.from;
  entity.save();
}

export function handlePoolPrivacyUpdated(event: PoolPrivacyUpdatedEvent): void {
  let entity = new PoolPrivacyUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.isPoolPrivate = event.params.isPoolPrivate;
  entity.save();
}

export function handleTransactionExecuted(event: TransactionExecutedEvent): void {
  let entity = new TransactionExecuted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.transactionType = event.params.transactionType;
  entity.time = event.params.time;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.save();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);
  pool.save();

  let withdrawnAssetsTuple = event.params.withdrawnAssets as Array<WithdrawalWithdrawnAssetsStruct>;
  for (let i = 0; i < withdrawnAssetsTuple.length; i++) {
    let blockData = withdrawnAssetsTuple[i];
    let decimals = fetchTokenDecimals(blockData.asset);
    let tokenAmountWithdrawn = convertTokenToDecimal(blockData.amount, decimals);

    let withdrawnAssets = new AssetsWithdrawn(
      event.transaction.hash.toHex() + '-' + blockData.asset.toHexString()
    );

    withdrawnAssets.asset = blockData.asset;
    withdrawnAssets.name = fetchTokenName(blockData.asset);
    withdrawnAssets.amount = tokenAmountWithdrawn;
    withdrawnAssets.withdrawProcessed = blockData.withdrawProcessed;
    withdrawnAssets.withdrawal = entity.id;
    withdrawnAssets.save();

    // load the matched Asset with withdrawn asset
    // this part is causing a break
    // let asset = Asset.load(event.address.toHexString() + "-" + blockData.asset.toHexString());
    // if (!asset) {
    //   asset = new Asset(event.address.toHexString() + "-" + blockData.asset.toHexString());
    //   asset.pool = pool.id
    // }
    // let newBalance = asset.balance.minus(tokenAmountWithdrawn);
    // asset.pool = pool.id
    // asset.name = fetchTokenName(blockData.asset);
    // asset.balance = newBalance;
    // asset.block = event.block.number.toI32();
    // asset.time = event.block.timestamp.toI32();
    // asset.decimals = decimals;
    // asset.save();
  };

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = pool.totalSupply;
  entity.investor = event.params.investor;
  entity.valueWithdrawn = event.params.valueWithdrawn;
  entity.fundTokensWithdrawn = event.params.fundTokensWithdrawn;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.block = event.block.number.toI32();
  entity.save();
}