import { Transfer } from "../../generated/schema";

export function findOrCreateTransfer(ID: string): Transfer {
  let entity = Transfer.load(ID);
  if (entity === null) {
    entity = new Transfer(ID);
  }
  return entity;
}
