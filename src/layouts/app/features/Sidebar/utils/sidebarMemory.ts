import { createBooleanPersistentItem } from "@/utils/persistentItem/createPersistentItem";
import { PersistenceStrategy } from "@/utils/persistentItem/PersistenceStrategy";

export const sidebarMemory = createBooleanPersistentItem({
  key: "@nexpenda/sidebar",
  persistenceStrategy: PersistenceStrategy.LocalStorage,
});
