import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { TransferCount } from "../../generated/schema";

const ID = "1";
const BIGINT_ONE = BigInt.fromString("1");
const BIGINT_ZERO = BigInt.fromString("0");

export function getTransferCount(): TransferCount {
  let entity = TransferCount.load(ID);
  if (entity === null) {
    entity = new TransferCount(ID);
    entity.value = BIGINT_ZERO;
    entity.save();
  }
  return entity;
}

export function increasementTransferCount(): TransferCount {
  let entity = getTransferCount();
  const oldValue = entity.value;
  entity.value = oldValue.plus(BIGINT_ONE);
  entity.save();
  return entity;
}
