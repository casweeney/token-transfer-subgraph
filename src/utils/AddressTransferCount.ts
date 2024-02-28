import { BigInt } from "@graphprotocol/graph-ts";
import { AddressTransferCount } from "../../generated/schema";

const BIGINT_ONE = BigInt.fromString("1");
const BIGINT_ZERO = BigInt.fromString("0");

export function getAddressTransferCount(addy: string): AddressTransferCount {
  let entity = AddressTransferCount.load(addy);
  if (entity === null) {
    entity = new AddressTransferCount(addy);
    entity.value = BIGINT_ZERO;
    entity.save();
  }
  return entity;
}

export function increasementAddressTransferCount(addy: string): AddressTransferCount {
  let entity = getAddressTransferCount(addy);
  const oldValue = entity.value;
  entity.value = oldValue.plus(BIGINT_ONE);
  entity.save();
  return entity;
}
