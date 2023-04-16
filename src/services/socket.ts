import { ActivityItem, IOtherBids } from '@/types/collection.types';
import io from 'socket.io-client';

const socket = io('wss://feeds.prod.blur.io/', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('pong', () => {
  socket.emit('ping');
});

// Top bid
export const subscribeToBidStats = (
  address: string,
  callback: (topBidValue: number, topBidTotal: number) => void
) => {
  const channel = `${address.toLocaleLowerCase()}.denormalizer.collectionBidStats`;

  return new Promise<boolean>((resolve) => {
    socket.on(channel, (arg) => {
      callback(parseFloat(arg.bestPrice), parseFloat(arg.totalValue));
    });

    socket.emit('subscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};

// Floor price
export const subscribeToFloorUpdates = (
  address: string,
  callback: (floorPrice: number) => void
) => {
  const channel = `${address.toLocaleLowerCase()}.stats.floorUpdate`;

  return new Promise<boolean>((resolve) => {
    socket.on(channel, (arg) => {
      callback(parseFloat(arg.floor0.amount));
    });

    socket.emit('subscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};

// Others bids data
export const subscribeToBidPriceUpdates = (
  address: string,
  callback: (updates: IOtherBids[]) => void
) => {
  const channel = `${address.toLocaleLowerCase()}.denormalizer.collectionBidPriceUpdates`;

  return new Promise<boolean>((resolve) => {
    socket.on(channel, (arg) => {
      callback(arg.updates);
    });

    socket.emit('subscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};

// Number of listings
export const subscribeToListingsUpdates = (
  address: string,
  callback: (numberListings: number) => void
) => {
  const channel = `${address.toLocaleLowerCase()}.feeds.collections.updatedNumberListings`;

  return new Promise<boolean>((resolve) => {
    socket.on(channel, (arg) => {
      callback(parseInt(arg.numberListings));
    });

    socket.emit('subscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};

// Collection activity
export const subscribeToEventsCreated = (
  address: string,
  callback: (items: ActivityItem[]) => void
) => {
  const channel = `${address.toLocaleLowerCase()}.feeds.activity.eventsCreated`;

  return new Promise<boolean>((resolve) => {
    socket.on(channel, (arg) => {
      callback(arg.items);
    });

    socket.emit('subscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};

export const unsubscribeFromBidStats = (address: string) =>
  unsubscribeFromChannel(
    `${address.toLocaleLowerCase()}.denormalizer.collectionBidStats`
  );

export const unsubscribeFromFloorUpdates = (address: string) =>
  unsubscribeFromChannel(`${address.toLocaleLowerCase()}.stats.floorUpdate`);

export const unsubscribeFromBidPriceUpdates = (address: string) =>
  unsubscribeFromChannel(
    `${address.toLocaleLowerCase()}.denormalizer.collectionBidPriceUpdates`
  );

export const unsubscribeFromListingsUpdates = (address: string) =>
  unsubscribeFromChannel(
    `${address.toLocaleLowerCase()}.feeds.collections.updatedNumberListings`
  );

export const unsubscribeFromEventsCreated = (address: string) =>
  unsubscribeFromChannel(
    `${address.toLocaleLowerCase()}.feeds.activity.eventsCreated`
  );

const unsubscribeFromChannel = (channel: string) => {
  return new Promise<boolean>((resolve) => {
    socket.emit('unsubscribe', [channel], (response: any) => {
      resolve(response);
    });
  });
};
