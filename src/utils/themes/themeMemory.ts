import { createPersistentItem } from "../persistentItem/createPersistentItem";
import { PersistenceStrategy } from "../persistentItem/PersistenceStrategy";

export const themeMemory = createPersistentItem<SelectableTheme>({
  key: "@nexpenda/theme",
  validate: (v: any): v is Theme => ["dark", "light", "system"].includes(v),
  persistenceStrategy: PersistenceStrategy.LocalStorage,
});
