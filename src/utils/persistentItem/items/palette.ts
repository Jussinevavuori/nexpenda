import { palettes } from "@/utils/color/palettes";
import { createPersistentItem } from "../createPersistentItem";
import { PersistenceStrategy } from "../PersistenceStrategy";

export const persistentPalette = createPersistentItem<StaticPalette>({
  key: "@nexpenda/palette",
  validate: (v: any): v is StaticPalette => palettes.static.includes(v),
  persistenceStrategy: PersistenceStrategy.LocalStorage,
});
