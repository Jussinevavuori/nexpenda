import { useEffect, useState } from "react";
import { createSubscribable } from "../subscribable";
import { IPersistenceStrategy } from "./PersistenceStrategy";

export interface IPersistentItem<T> {
  get(): Promise<T | undefined>;
  getSync(): T | undefined;
  set(value: T): Promise<T>;
  update(updater: (t: T | undefined) => T): Promise<T>;
  clear(): Promise<void>;
  subscribe(listener: (t: T | undefined) => void): () => void;
  validate: (t: any) => t is T;
  useValue(): T | undefined;
}

export function createPersistentItem<T>(options: {
  key: string;
  validate: (t: any) => t is T;
  persistenceStrategy: IPersistenceStrategy;
  serialize?: (t: T) => string;
  deserialize?: (string: string) => T | undefined;
}): IPersistentItem<T> {
  // Create subscribable for item
  const subscribable = createSubscribable<T | undefined>();

  return {
    ...options,

    // Simple getter function (Sync, only if persistence strategy supports getSync)
    getSync() {
      return options.persistenceStrategy.getSync({
        key: options.key,
        validate: options.validate,
        deserialize: options.deserialize,
      });
    },

    // Simple getter function (Async, supported by all persistence strategies)
    get() {
      return options.persistenceStrategy.get({
        key: options.key,
        validate: options.validate,
        deserialize: options.deserialize,
      });
    },

    // Setter function publishes an update
    set(value: T) {
      subscribable.publish(value);
      return options.persistenceStrategy.set({
        value,
        key: options.key,
        serialize: options.serialize,
      });
    },

    // Setter function publishes an update
    async update(updater: (prev: T | undefined) => T) {
      const prev = await this.get();
      const value = updater(prev);
      subscribable.publish(value);
      return options.persistenceStrategy.set({
        value,
        key: options.key,
        serialize: options.serialize,
      });
    },

    // Clear function publishes an update
    clear() {
      subscribable.publish(undefined);
      return options.persistenceStrategy.clear(options.key);
    },

    // Subscribe wrapper
    subscribe(listener: (value: T | undefined) => void) {
      return subscribable.subscribe(listener);
    },

    // React hook (initialize with sync value or async if sync not supported)T
    useValue() {
      const [value, setValue] = useState<T | undefined>(this.getSync());
      useEffect(() => {
        if (!options.persistenceStrategy.supportsSync) {
          this.get().then((_) => setValue(_));
        }
      }, [setValue]);
      useEffect(() => subscribable.subscribe((t) => setValue(t)), [setValue]);
      return value;
    },
  };
}

export function createBooleanPersistentItem(options: {
  key: string;
  persistenceStrategy: IPersistenceStrategy;
}) {
  return createPersistentItem<boolean>({
    ...options,
    validate: (v: any): v is boolean => typeof v === "boolean",
    serialize: (value) => (value ? "true" : "false"),
    deserialize: (value) => value === "true",
  });
}
