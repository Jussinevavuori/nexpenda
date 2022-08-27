import { createPersistentItem } from "../createPersistentItem";
import { PersistenceStrategy } from "../PersistenceStrategy";

export const persistentTheme = createPersistentItem<SelectableTheme>({
  key: "@nexpenda/theme",
  validate: (v: any): v is Theme => ["dark", "light", "system"].includes(v),
  persistenceStrategy: PersistenceStrategy.LocalStorage,
});
