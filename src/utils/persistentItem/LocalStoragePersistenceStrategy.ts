import {
  IPersistenceStrategy,
  PersistenceStrategyGetOptions,
  PersistenceStrategySetOptions,
} from "./PersistenceStrategy";

export const LocalStoragePersistenceStrategy: IPersistenceStrategy = {
  supportsSync: true,

  // Local storage getter
  getSync<T>(opts: PersistenceStrategyGetOptions<T>): T | undefined {
    try {
      // Get serial value from local storage
      const serial = localStorage.getItem(opts.key);

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
  // Local storage getter
  async get<T>(opts: PersistenceStrategyGetOptions<T>): Promise<T | undefined> {
    return this.getSync(opts);
  },

  // Local storage setter
  async set<T>(opts: PersistenceStrategySetOptions<T>): Promise<T> {
    // Stringify value and save to local storage
    const serial = opts.serialize
      ? opts.serialize(opts.value)
      : JSON.stringify(opts.value);
    localStorage.setItem(opts.key, serial);
    return opts.value;
  },

  // Local storage clear
  async clear(key: string): Promise<void> {
    // Clear value from local storage
    localStorage.removeItem(key);
  },
};
