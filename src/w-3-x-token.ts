import { log, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/W3XToken/W3XToken";
import {
  getTransferCount,
  incrementTransferCount,
} from "./utils/TransferCount";
import { findOrCreateTransfer } from "./utils/Transfer";
import { incrementAddressTransferCount } from "./utils/AddressTransferCount";
import { TransferTotal } from "../generated/schema"
import { updateTransferTotal } from "./utils/TransferTotal";

export function handleTransfer(event: TransferEvent): void {
  incrementTransferCount();
  incrementAddressTransferCount(event.params.from.toHexString());
  updateTransferTotal(event.params.value);

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
