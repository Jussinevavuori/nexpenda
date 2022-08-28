import { palettes } from "@/utils/color/palettes";
import { createPersistentItem } from "../persistentItem/createPersistentItem";
import { PersistenceStrategy } from "../persistentItem/PersistenceStrategy";

export const palatteMemory = createPersistentItem<StaticPalette>({
  key: "@nexpenda/palette",
  validate: (v: any): v is StaticPalette => palettes.static.includes(v),
  persistenceStrategy: PersistenceStrategy.LocalStorage,
});
