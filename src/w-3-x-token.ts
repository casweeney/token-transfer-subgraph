import { log } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/W3XToken/W3XToken";
import {
  getTransferCount,
  increasementTransferCount,
} from "./utils/TransferCount";
import { findOrCreateTransfer } from "./utils/Transfer";
import { increasementAddressTransferCount } from "./utils/AddressTransferCount";

export function handleTransfer(event: TransferEvent): void {
  increasementTransferCount();
  // increasementAddressTransferCount(event.params.to.toHexString());
  increasementAddressTransferCount(event.params.from.toHexString());

  const transferCount = getTransferCount();
  log.debug("Transfer Count: {}", [transferCount.value.toString()]);
  let entity = findOrCreateTransfer(event.transaction.hash.toHex());
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.transferIndex = transferCount.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
