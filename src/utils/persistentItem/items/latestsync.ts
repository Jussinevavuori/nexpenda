import { createPersistentItem } from "../createPersistentItem";
import { PersistenceStrategy } from "../PersistenceStrategy";

export const persistentLatestSync = createPersistentItem<number>({
  key: "@nexpenda/latestsync",
  validate: (v: any): v is number => typeof v === "number",
  persistenceStrategy: PersistenceStrategy.SessionStorage,
  serialize: (v) => v.toString(),
  deserialize: (v) => Number.parseInt(v),
});
