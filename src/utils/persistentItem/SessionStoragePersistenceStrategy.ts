import {
  IPersistenceStrategy,
  PersistenceStrategyGetOptions,
  PersistenceStrategySetOptions,
} from "./PersistenceStrategy";

export const SessionStoragePersistenceStrategy: IPersistenceStrategy = {
  supportsSync: true,

  // Session storage getter
  getSync<T>(opts: PersistenceStrategyGetOptions<T>): T | undefined {
    try {
      // Get serial value from local storage
      const serial = sessionStorage.getItem(opts.key);

      // No value found, return undefined
      if (!serial) return undefined;

      // Deserialize
      const value = opts.deserialize
        ? opts.deserialize(serial)
        : JSON.parse(serial);

      // Serialization failed
      if (!value) return undefined;

      // Validate, return value or undefined on invalid validation
      if (opts.validate(value)) return value;
      return undefined;
    } catch (e) {
      return undefined;
    }
  },
  // Session storage getter
  async get<T>(opts: PersistenceStrategyGetOptions<T>): Promise<T | undefined> {
    return this.getSync(opts);
  },

  // Session storage setter
  async set<T>(opts: PersistenceStrategySetOptions<T>): Promise<T> {
    // Stringify value and save to local storage
    const serial = opts.serialize
      ? opts.serialize(opts.value)
      : JSON.stringify(opts.value);
    sessionStorage.setItem(opts.key, serial);
    return opts.value;
  },

  // Session storage clear
  async clear(key: string): Promise<void> {
    // Clear value from local storage
    sessionStorage.removeItem(key);
  },
};
