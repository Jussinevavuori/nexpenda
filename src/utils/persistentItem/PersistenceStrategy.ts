import { LocalStoragePersistenceStrategy } from "./LocalStoragePersistenceStrategy";
import { SessionStoragePersistenceStrategy } from "./SessionStoragePersistenceStrategy";

export type PersistenceStrategyGetOptions<T> = {
  key: string;
  validate: (t: any) => t is T;
  deserialize?: (serial: string) => T | undefined;
};

export type PersistenceStrategySetOptions<T> = {
  key: string;
  value: T;
  serialize?: (t: T) => string;
};
export interface IPersistenceStrategy {
  supportsSync?: boolean;
  get<T>(options: PersistenceStrategyGetOptions<T>): Promise<T | undefined>;
  getSync<T>(options: PersistenceStrategyGetOptions<T>): T | undefined;
  set<T>(options: PersistenceStrategySetOptions<T>): Promise<T>;
  clear<T>(key: string): Promise<void>;
}

export const PersistenceStrategy = {
  LocalStorage: LocalStoragePersistenceStrategy,
  SessionStorage: SessionStoragePersistenceStrategy,
};
