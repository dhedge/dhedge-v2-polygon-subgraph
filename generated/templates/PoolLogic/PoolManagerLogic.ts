// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AssetAdded extends ethereum.Event {
  get params(): AssetAdded__Params {
    return new AssetAdded__Params(this);
  }
}

export class AssetAdded__Params {
  _event: AssetAdded;

  constructor(event: AssetAdded) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get asset(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get isDeposit(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class AssetRemoved extends ethereum.Event {
  get params(): AssetRemoved__Params {
    return new AssetRemoved__Params(this);
  }
}

export class AssetRemoved__Params {
  _event: AssetRemoved;

  constructor(event: AssetRemoved) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get asset(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ManagerFeeIncreaseAnnounced extends ethereum.Event {
  get params(): ManagerFeeIncreaseAnnounced__Params {
    return new ManagerFeeIncreaseAnnounced__Params(this);
  }
}

export class ManagerFeeIncreaseAnnounced__Params {
  _event: ManagerFeeIncreaseAnnounced;

  constructor(event: ManagerFeeIncreaseAnnounced) {
    this._event = event;
  }

  get newNumerator(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get announcedFeeActivationTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ManagerFeeIncreaseRenounced extends ethereum.Event {
  get params(): ManagerFeeIncreaseRenounced__Params {
    return new ManagerFeeIncreaseRenounced__Params(this);
  }
}

export class ManagerFeeIncreaseRenounced__Params {
  _event: ManagerFeeIncreaseRenounced;

  constructor(event: ManagerFeeIncreaseRenounced) {
    this._event = event;
  }
}

export class ManagerFeeSet extends ethereum.Event {
  get params(): ManagerFeeSet__Params {
    return new ManagerFeeSet__Params(this);
  }
}

export class ManagerFeeSet__Params {
  _event: ManagerFeeSet;

  constructor(event: ManagerFeeSet) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get numerator(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get denominator(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ManagerUpdated extends ethereum.Event {
  get params(): ManagerUpdated__Params {
    return new ManagerUpdated__Params(this);
  }
}

export class ManagerUpdated__Params {
  _event: ManagerUpdated;

  constructor(event: ManagerUpdated) {
    this._event = event;
  }

  get newManager(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newManagerName(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class PoolLogicSet extends ethereum.Event {
  get params(): PoolLogicSet__Params {
    return new PoolLogicSet__Params(this);
  }
}

export class PoolLogicSet__Params {
  _event: PoolLogicSet;

  constructor(event: PoolLogicSet) {
    this._event = event;
  }

  get poolLogic(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PoolManagerLogic__getFundCompositionResultAssetsStruct extends ethereum.Tuple {
  get asset(): Address {
    return this[0].toAddress();
  }

  get isDeposit(): boolean {
    return this[1].toBoolean();
  }
}

export class PoolManagerLogic__getFundCompositionResult {
  value0: Array<PoolManagerLogic__getFundCompositionResultAssetsStruct>;
  value1: Array<BigInt>;
  value2: Array<BigInt>;

  constructor(
    value0: Array<PoolManagerLogic__getFundCompositionResultAssetsStruct>,
    value1: Array<BigInt>,
    value2: Array<BigInt>
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTupleArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigIntArray(this.value2));
    return map;
  }
}

export class PoolManagerLogic__getManagerFeeResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PoolManagerLogic__getManagerFeeIncreaseInfoResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PoolManagerLogic__getMaximumManagerFeeResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PoolManagerLogic__getSupportedAssetsResultValue0Struct extends ethereum.Tuple {
  get asset(): Address {
    return this[0].toAddress();
  }

  get isDeposit(): boolean {
    return this[1].toBoolean();
  }
}

export class PoolManagerLogic__supportedAssetsResult {
  value0: Address;
  value1: boolean;

  constructor(value0: Address, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }
}

export class PoolManagerLogic extends ethereum.SmartContract {
  static bind(address: Address): PoolManagerLogic {
    return new PoolManagerLogic("PoolManagerLogic", address);
  }

  announcedFeeIncreaseNumerator(): BigInt {
    let result = super.call(
      "announcedFeeIncreaseNumerator",
      "announcedFeeIncreaseNumerator():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_announcedFeeIncreaseNumerator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "announcedFeeIncreaseNumerator",
      "announcedFeeIncreaseNumerator():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  announcedFeeIncreaseTimestamp(): BigInt {
    let result = super.call(
      "announcedFeeIncreaseTimestamp",
      "announcedFeeIncreaseTimestamp():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_announcedFeeIncreaseTimestamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "announcedFeeIncreaseTimestamp",
      "announcedFeeIncreaseTimestamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  assetBalance(asset: Address): BigInt {
    let result = super.call("assetBalance", "assetBalance(address):(uint256)", [
      ethereum.Value.fromAddress(asset)
    ]);

    return result[0].toBigInt();
  }

  try_assetBalance(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "assetBalance",
      "assetBalance(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  assetDecimal(asset: Address): BigInt {
    let result = super.call("assetDecimal", "assetDecimal(address):(uint256)", [
      ethereum.Value.fromAddress(asset)
    ]);

    return result[0].toBigInt();
  }

  try_assetDecimal(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "assetDecimal",
      "assetDecimal(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  assetPosition(param0: Address): BigInt {
    let result = super.call(
      "assetPosition",
      "assetPosition(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_assetPosition(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "assetPosition",
      "assetPosition(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  assetValue(asset: Address, amount: BigInt): BigInt {
    let result = super.call(
      "assetValue",
      "assetValue(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(asset),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return result[0].toBigInt();
  }

  try_assetValue(asset: Address, amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "assetValue",
      "assetValue(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(asset),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  assetValue1(asset: Address): BigInt {
    let result = super.call("assetValue", "assetValue(address):(uint256)", [
      ethereum.Value.fromAddress(asset)
    ]);

    return result[0].toBigInt();
  }

  try_assetValue1(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("assetValue", "assetValue(address):(uint256)", [
      ethereum.Value.fromAddress(asset)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDepositAssets(): Array<Address> {
    let result = super.call(
      "getDepositAssets",
      "getDepositAssets():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_getDepositAssets(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getDepositAssets",
      "getDepositAssets():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getFundComposition(): PoolManagerLogic__getFundCompositionResult {
    let result = super.call(
      "getFundComposition",
      "getFundComposition():((address,bool)[],uint256[],uint256[])",
      []
    );

    return new PoolManagerLogic__getFundCompositionResult(
      result[0].toTupleArray<
        PoolManagerLogic__getFundCompositionResultAssetsStruct
      >(),
      result[1].toBigIntArray(),
      result[2].toBigIntArray()
    );
  }

  try_getFundComposition(): ethereum.CallResult<
    PoolManagerLogic__getFundCompositionResult
  > {
    let result = super.tryCall(
      "getFundComposition",
      "getFundComposition():((address,bool)[],uint256[],uint256[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolManagerLogic__getFundCompositionResult(
        value[0].toTupleArray<
          PoolManagerLogic__getFundCompositionResultAssetsStruct
        >(),
        value[1].toBigIntArray(),
        value[2].toBigIntArray()
      )
    );
  }

  getManagerFee(): PoolManagerLogic__getManagerFeeResult {
    let result = super.call(
      "getManagerFee",
      "getManagerFee():(uint256,uint256)",
      []
    );

    return new PoolManagerLogic__getManagerFeeResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_getManagerFee(): ethereum.CallResult<
    PoolManagerLogic__getManagerFeeResult
  > {
    let result = super.tryCall(
      "getManagerFee",
      "getManagerFee():(uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolManagerLogic__getManagerFeeResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  getManagerFeeIncreaseInfo(): PoolManagerLogic__getManagerFeeIncreaseInfoResult {
    let result = super.call(
      "getManagerFeeIncreaseInfo",
      "getManagerFeeIncreaseInfo():(uint256,uint256)",
      []
    );

    return new PoolManagerLogic__getManagerFeeIncreaseInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_getManagerFeeIncreaseInfo(): ethereum.CallResult<
    PoolManagerLogic__getManagerFeeIncreaseInfoResult
  > {
    let result = super.tryCall(
      "getManagerFeeIncreaseInfo",
      "getManagerFeeIncreaseInfo():(uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolManagerLogic__getManagerFeeIncreaseInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  getMaximumManagerFee(): PoolManagerLogic__getMaximumManagerFeeResult {
    let result = super.call(
      "getMaximumManagerFee",
      "getMaximumManagerFee():(uint256,uint256)",
      []
    );

    return new PoolManagerLogic__getMaximumManagerFeeResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_getMaximumManagerFee(): ethereum.CallResult<
    PoolManagerLogic__getMaximumManagerFeeResult
  > {
    let result = super.tryCall(
      "getMaximumManagerFee",
      "getMaximumManagerFee():(uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolManagerLogic__getMaximumManagerFeeResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  getMaximumManagerFeeChange(): BigInt {
    let result = super.call(
      "getMaximumManagerFeeChange",
      "getMaximumManagerFeeChange():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getMaximumManagerFeeChange(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMaximumManagerFeeChange",
      "getMaximumManagerFeeChange():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMembers(): Array<Address> {
    let result = super.call("getMembers", "getMembers():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getMembers(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("getMembers", "getMembers():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getSupportedAssets(): Array<
    PoolManagerLogic__getSupportedAssetsResultValue0Struct
  > {
    let result = super.call(
      "getSupportedAssets",
      "getSupportedAssets():((address,bool)[])",
      []
    );

    return result[0].toTupleArray<
      PoolManagerLogic__getSupportedAssetsResultValue0Struct
    >();
  }

  try_getSupportedAssets(): ethereum.CallResult<
    Array<PoolManagerLogic__getSupportedAssetsResultValue0Struct>
  > {
    let result = super.tryCall(
      "getSupportedAssets",
      "getSupportedAssets():((address,bool)[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        PoolManagerLogic__getSupportedAssetsResultValue0Struct
      >()
    );
  }

  isDepositAsset(asset: Address): boolean {
    let result = super.call(
      "isDepositAsset",
      "isDepositAsset(address):(bool)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBoolean();
  }

  try_isDepositAsset(asset: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isDepositAsset",
      "isDepositAsset(address):(bool)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isMemberAllowed(member: Address): boolean {
    let result = super.call(
      "isMemberAllowed",
      "isMemberAllowed(address):(bool)",
      [ethereum.Value.fromAddress(member)]
    );

    return result[0].toBoolean();
  }

  try_isMemberAllowed(member: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isMemberAllowed",
      "isMemberAllowed(address):(bool)",
      [ethereum.Value.fromAddress(member)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isSupportedAsset(asset: Address): boolean {
    let result = super.call(
      "isSupportedAsset",
      "isSupportedAsset(address):(bool)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBoolean();
  }

  try_isSupportedAsset(asset: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isSupportedAsset",
      "isSupportedAsset(address):(bool)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  manager(): Address {
    let result = super.call("manager", "manager():(address)", []);

    return result[0].toAddress();
  }

  try_manager(): ethereum.CallResult<Address> {
    let result = super.tryCall("manager", "manager():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  managerFeeNumerator(): BigInt {
    let result = super.call(
      "managerFeeNumerator",
      "managerFeeNumerator():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_managerFeeNumerator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "managerFeeNumerator",
      "managerFeeNumerator():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  managerName(): string {
    let result = super.call("managerName", "managerName():(string)", []);

    return result[0].toString();
  }

  try_managerName(): ethereum.CallResult<string> {
    let result = super.tryCall("managerName", "managerName():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  numberOfMembers(): BigInt {
    let result = super.call(
      "numberOfMembers",
      "numberOfMembers():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_numberOfMembers(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "numberOfMembers",
      "numberOfMembers():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  poolLogic(): Address {
    let result = super.call("poolLogic", "poolLogic():(address)", []);

    return result[0].toAddress();
  }

  try_poolLogic(): ethereum.CallResult<Address> {
    let result = super.tryCall("poolLogic", "poolLogic():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  setPoolLogic(_poolLogic: Address): boolean {
    let result = super.call("setPoolLogic", "setPoolLogic(address):(bool)", [
      ethereum.Value.fromAddress(_poolLogic)
    ]);

    return result[0].toBoolean();
  }

  try_setPoolLogic(_poolLogic: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("setPoolLogic", "setPoolLogic(address):(bool)", [
      ethereum.Value.fromAddress(_poolLogic)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  supportedAssets(param0: BigInt): PoolManagerLogic__supportedAssetsResult {
    let result = super.call(
      "supportedAssets",
      "supportedAssets(uint256):(address,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new PoolManagerLogic__supportedAssetsResult(
      result[0].toAddress(),
      result[1].toBoolean()
    );
  }

  try_supportedAssets(
    param0: BigInt
  ): ethereum.CallResult<PoolManagerLogic__supportedAssetsResult> {
    let result = super.tryCall(
      "supportedAssets",
      "supportedAssets(uint256):(address,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolManagerLogic__supportedAssetsResult(
        value[0].toAddress(),
        value[1].toBoolean()
      )
    );
  }

  totalFundValue(): BigInt {
    let result = super.call("totalFundValue", "totalFundValue():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalFundValue(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalFundValue",
      "totalFundValue():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  trader(): Address {
    let result = super.call("trader", "trader():(address)", []);

    return result[0].toAddress();
  }

  try_trader(): ethereum.CallResult<Address> {
    let result = super.tryCall("trader", "trader():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  validateAsset(asset: Address): boolean {
    let result = super.call("validateAsset", "validateAsset(address):(bool)", [
      ethereum.Value.fromAddress(asset)
    ]);

    return result[0].toBoolean();
  }

  try_validateAsset(asset: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "validateAsset",
      "validateAsset(address):(bool)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class AddMemberCall extends ethereum.Call {
  get inputs(): AddMemberCall__Inputs {
    return new AddMemberCall__Inputs(this);
  }

  get outputs(): AddMemberCall__Outputs {
    return new AddMemberCall__Outputs(this);
  }
}

export class AddMemberCall__Inputs {
  _call: AddMemberCall;

  constructor(call: AddMemberCall) {
    this._call = call;
  }

  get member(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddMemberCall__Outputs {
  _call: AddMemberCall;

  constructor(call: AddMemberCall) {
    this._call = call;
  }
}

export class AddMembersCall extends ethereum.Call {
  get inputs(): AddMembersCall__Inputs {
    return new AddMembersCall__Inputs(this);
  }

  get outputs(): AddMembersCall__Outputs {
    return new AddMembersCall__Outputs(this);
  }
}

export class AddMembersCall__Inputs {
  _call: AddMembersCall;

  constructor(call: AddMembersCall) {
    this._call = call;
  }

  get members(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class AddMembersCall__Outputs {
  _call: AddMembersCall;

  constructor(call: AddMembersCall) {
    this._call = call;
  }
}

export class AnnounceManagerFeeIncreaseCall extends ethereum.Call {
  get inputs(): AnnounceManagerFeeIncreaseCall__Inputs {
    return new AnnounceManagerFeeIncreaseCall__Inputs(this);
  }

  get outputs(): AnnounceManagerFeeIncreaseCall__Outputs {
    return new AnnounceManagerFeeIncreaseCall__Outputs(this);
  }
}

export class AnnounceManagerFeeIncreaseCall__Inputs {
  _call: AnnounceManagerFeeIncreaseCall;

  constructor(call: AnnounceManagerFeeIncreaseCall) {
    this._call = call;
  }

  get numerator(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class AnnounceManagerFeeIncreaseCall__Outputs {
  _call: AnnounceManagerFeeIncreaseCall;

  constructor(call: AnnounceManagerFeeIncreaseCall) {
    this._call = call;
  }
}

export class ChangeAssetsCall extends ethereum.Call {
  get inputs(): ChangeAssetsCall__Inputs {
    return new ChangeAssetsCall__Inputs(this);
  }

  get outputs(): ChangeAssetsCall__Outputs {
    return new ChangeAssetsCall__Outputs(this);
  }
}

export class ChangeAssetsCall__Inputs {
  _call: ChangeAssetsCall;

  constructor(call: ChangeAssetsCall) {
    this._call = call;
  }

  get _addAssets(): Array<ChangeAssetsCall_addAssetsStruct> {
    return this._call.inputValues[0].value.toTupleArray<
      ChangeAssetsCall_addAssetsStruct
    >();
  }

  get _removeAssets(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class ChangeAssetsCall__Outputs {
  _call: ChangeAssetsCall;

  constructor(call: ChangeAssetsCall) {
    this._call = call;
  }
}

export class ChangeAssetsCall_addAssetsStruct extends ethereum.Tuple {
  get asset(): Address {
    return this[0].toAddress();
  }

  get isDeposit(): boolean {
    return this[1].toBoolean();
  }
}

export class ChangeManagerCall extends ethereum.Call {
  get inputs(): ChangeManagerCall__Inputs {
    return new ChangeManagerCall__Inputs(this);
  }

  get outputs(): ChangeManagerCall__Outputs {
    return new ChangeManagerCall__Outputs(this);
  }
}

export class ChangeManagerCall__Inputs {
  _call: ChangeManagerCall;

  constructor(call: ChangeManagerCall) {
    this._call = call;
  }

  get newManager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get newManagerName(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ChangeManagerCall__Outputs {
  _call: ChangeManagerCall;

  constructor(call: ChangeManagerCall) {
    this._call = call;
  }
}

export class CommitManagerFeeIncreaseCall extends ethereum.Call {
  get inputs(): CommitManagerFeeIncreaseCall__Inputs {
    return new CommitManagerFeeIncreaseCall__Inputs(this);
  }

  get outputs(): CommitManagerFeeIncreaseCall__Outputs {
    return new CommitManagerFeeIncreaseCall__Outputs(this);
  }
}

export class CommitManagerFeeIncreaseCall__Inputs {
  _call: CommitManagerFeeIncreaseCall;

  constructor(call: CommitManagerFeeIncreaseCall) {
    this._call = call;
  }
}

export class CommitManagerFeeIncreaseCall__Outputs {
  _call: CommitManagerFeeIncreaseCall;

  constructor(call: CommitManagerFeeIncreaseCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _manager(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _managerName(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _poolLogic(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _managerFeeNumerator(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _supportedAssets(): Array<InitializeCall_supportedAssetsStruct> {
    return this._call.inputValues[5].value.toTupleArray<
      InitializeCall_supportedAssetsStruct
    >();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall_supportedAssetsStruct extends ethereum.Tuple {
  get asset(): Address {
    return this[0].toAddress();
  }

  get isDeposit(): boolean {
    return this[1].toBoolean();
  }
}

export class RemoveMemberCall extends ethereum.Call {
  get inputs(): RemoveMemberCall__Inputs {
    return new RemoveMemberCall__Inputs(this);
  }

  get outputs(): RemoveMemberCall__Outputs {
    return new RemoveMemberCall__Outputs(this);
  }
}

export class RemoveMemberCall__Inputs {
  _call: RemoveMemberCall;

  constructor(call: RemoveMemberCall) {
    this._call = call;
  }

  get member(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveMemberCall__Outputs {
  _call: RemoveMemberCall;

  constructor(call: RemoveMemberCall) {
    this._call = call;
  }
}

export class RemoveMembersCall extends ethereum.Call {
  get inputs(): RemoveMembersCall__Inputs {
    return new RemoveMembersCall__Inputs(this);
  }

  get outputs(): RemoveMembersCall__Outputs {
    return new RemoveMembersCall__Outputs(this);
  }
}

export class RemoveMembersCall__Inputs {
  _call: RemoveMembersCall;

  constructor(call: RemoveMembersCall) {
    this._call = call;
  }

  get members(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class RemoveMembersCall__Outputs {
  _call: RemoveMembersCall;

  constructor(call: RemoveMembersCall) {
    this._call = call;
  }
}

export class RemoveTraderCall extends ethereum.Call {
  get inputs(): RemoveTraderCall__Inputs {
    return new RemoveTraderCall__Inputs(this);
  }

  get outputs(): RemoveTraderCall__Outputs {
    return new RemoveTraderCall__Outputs(this);
  }
}

export class RemoveTraderCall__Inputs {
  _call: RemoveTraderCall;

  constructor(call: RemoveTraderCall) {
    this._call = call;
  }
}

export class RemoveTraderCall__Outputs {
  _call: RemoveTraderCall;

  constructor(call: RemoveTraderCall) {
    this._call = call;
  }
}

export class RenounceManagerFeeIncreaseCall extends ethereum.Call {
  get inputs(): RenounceManagerFeeIncreaseCall__Inputs {
    return new RenounceManagerFeeIncreaseCall__Inputs(this);
  }

  get outputs(): RenounceManagerFeeIncreaseCall__Outputs {
    return new RenounceManagerFeeIncreaseCall__Outputs(this);
  }
}

export class RenounceManagerFeeIncreaseCall__Inputs {
  _call: RenounceManagerFeeIncreaseCall;

  constructor(call: RenounceManagerFeeIncreaseCall) {
    this._call = call;
  }
}

export class RenounceManagerFeeIncreaseCall__Outputs {
  _call: RenounceManagerFeeIncreaseCall;

  constructor(call: RenounceManagerFeeIncreaseCall) {
    this._call = call;
  }
}

export class SetManagerFeeNumeratorCall extends ethereum.Call {
  get inputs(): SetManagerFeeNumeratorCall__Inputs {
    return new SetManagerFeeNumeratorCall__Inputs(this);
  }

  get outputs(): SetManagerFeeNumeratorCall__Outputs {
    return new SetManagerFeeNumeratorCall__Outputs(this);
  }
}

export class SetManagerFeeNumeratorCall__Inputs {
  _call: SetManagerFeeNumeratorCall;

  constructor(call: SetManagerFeeNumeratorCall) {
    this._call = call;
  }

  get numerator(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetManagerFeeNumeratorCall__Outputs {
  _call: SetManagerFeeNumeratorCall;

  constructor(call: SetManagerFeeNumeratorCall) {
    this._call = call;
  }
}

export class SetPoolLogicCall extends ethereum.Call {
  get inputs(): SetPoolLogicCall__Inputs {
    return new SetPoolLogicCall__Inputs(this);
  }

  get outputs(): SetPoolLogicCall__Outputs {
    return new SetPoolLogicCall__Outputs(this);
  }
}

export class SetPoolLogicCall__Inputs {
  _call: SetPoolLogicCall;

  constructor(call: SetPoolLogicCall) {
    this._call = call;
  }

  get _poolLogic(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPoolLogicCall__Outputs {
  _call: SetPoolLogicCall;

  constructor(call: SetPoolLogicCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetTraderCall extends ethereum.Call {
  get inputs(): SetTraderCall__Inputs {
    return new SetTraderCall__Inputs(this);
  }

  get outputs(): SetTraderCall__Outputs {
    return new SetTraderCall__Outputs(this);
  }
}

export class SetTraderCall__Inputs {
  _call: SetTraderCall;

  constructor(call: SetTraderCall) {
    this._call = call;
  }

  get newTrader(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTraderCall__Outputs {
  _call: SetTraderCall;

  constructor(call: SetTraderCall) {
    this._call = call;
  }
}
