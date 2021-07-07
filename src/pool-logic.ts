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
  AssetsWithdrawn
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
  log.info(
    'logging id from dataSource in handleDeposit at block number: {}',
    [id, event.block.number.toString()]
  );

  let poolTokenDecimals = fetchTokenDecimals(event.address);
  
  // Manager Logic
  let poolContract = PoolLogic.bind(event.address);
  let managerAddress = poolContract.poolManagerLogic();
  let managerContract = PoolManagerLogic.bind(managerAddress);
  
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }

  // let tryAssetBalance = managerContract.try_assetBalance(event.params.assetDeposited);
  // if (tryAssetBalance.reverted) {
  //   log.info(
  //     'assetBalance was reverted in tx hash {} at block number: {}',
  //     [event.transaction.hash.toHex(), event.block.number.toString()]
  //   );
  //   return;
  // }
  // let assetValue = managerContract.assetValue(event.params.assetDeposited, event.params.valueDeposited);
  
  // Create or Load Asset entity
  let asset = Asset.load(event.address.toHexString() + "-" + event.params.assetDeposited.toHexString());
  if (!asset) {
    asset = new Asset(event.address.toHexString() + "-" + event.params.assetDeposited.toHexString());
    asset.pool = pool.id
  }

  let decimals = fetchTokenDecimals(event.params.assetDeposited);
  let erc20Contract = ERC20.bind(event.params.assetDeposited);
  let fundAddress = Address.fromString(event.params.fundAddress.toHexString());
  
  let currentFormattedBalance = convertTokenToDecimal(erc20Contract.balanceOf(fundAddress), decimals);

  asset.time = event.block.timestamp.toI32()
  asset.block = event.block.number.toI32()
  asset.name = fetchTokenName(event.params.assetDeposited)
  asset.balance = currentFormattedBalance; 
  // asset.value = assetValue;
  asset.decimals = decimals;
  asset.save();

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
  pool.manager = managerAddress
  pool.manager = managerContract.manager();
  pool.managerName = poolContract.managerName();

  let poolSupply = convertTokenToDecimal(poolContract.totalSupply(), poolTokenDecimals);
  pool.totalSupply = poolSupply;
  pool.save();

  // Deposit Entity
  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = convertTokenToDecimal(poolContract.totalSupply(), poolTokenDecimals);
  entity.investor = event.params.investor;
  entity.assetDeposited = event.params.assetDeposited;
  entity.valueDeposited = event.params.valueDeposited;
  entity.fundTokensReceived = convertTokenToDecimal(event.params.fundTokensReceived, poolTokenDecimals);
  entity.totalInvestorFundTokens = convertTokenToDecimal(event.params.totalInvestorFundTokens, poolTokenDecimals);
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

  let poolContract = PoolLogic.bind(event.address);
  let poolTokenDecimals = fetchTokenDecimals(event.address);

  // Manager Logic
  let managerAddress = poolContract.poolManagerLogic();
  let managerContract = PoolManagerLogic.bind(managerAddress);

  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }

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
    let asset = Asset.load(event.address.toHexString() + "-" + blockData.asset.toHexString());
    let newBalance = asset.balance.minus(tokenAmountWithdrawn);
    asset.balance = newBalance;
    asset.block = event.block.number.toI32();
    asset.time = event.block.timestamp.toI32();
    asset.save();
  };

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = poolSupply;
  entity.investor = event.params.investor;
  entity.valueWithdrawn = event.params.valueWithdrawn;
  entity.fundTokensWithdrawn = convertTokenToDecimal(event.params.fundTokensWithdrawn, poolTokenDecimals);
  entity.totalInvestorFundTokens = convertTokenToDecimal(event.params.totalInvestorFundTokens, poolTokenDecimals);
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.block = event.block.number.toI32();
  entity.save();
}