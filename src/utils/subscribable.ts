export type Subscriber<MessageType> = (msg: MessageType) => void;

export type Subscribable<MessageType> = {
  publish: (msg: MessageType) => void;
  subscribe: (subscriber: Subscriber<MessageType>) => () => void;
};

/**
 * Creates a subscribable which can be subscribed to with a callback function
 * and published to all subscribed callback functions.
 */
export function createSubscribable<MessageType>(): Subscribable<MessageType> {
  const subscribers = new Set<(msg: MessageType) => void>();

  return {
    publish: (msg: MessageType) => {
      subscribers.forEach((s) => s(msg));
    },

    subscribe: (subscriber: Subscriber<MessageType>) => {
      subscribers.add(subscriber);
      return () => {
        subscribers.delete(subscriber);
      };
    },
  };
}
