export enum ECollectionStatus {
  init,
  ready,
  transacting,
}

export enum ECollectionMode {
  manual,
  auto,
}

export enum EActivityType {
  listing,
  sale,
}

export enum EMarketplace {
  opensea,
  blur,
}

export type TBid = {
  value: number;
  size: number;
  biddersCount: number;
};

export type TBidsData = {
  [key: string]: TBid;
};

export interface IOtherBids {
  price: string;
  executableSize: number;
  bidderCount: number;
}

export interface ActivityItem {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
  transactionHash: string;
  eventType: string;
  price: string;
  priceUnit: string;
  marketplace: string;
}

export type TActivity = {
  id: number;
  tokenId: number;
  marketplace: EMarketplace;
  eventType: EActivityType;
  price: number;
  priceUnit: string;
  createdAt: string;
  fromAddress: string;
  toAddress?: string;
  transactionHash?: string;
};

export type TUserBid = {
  value: number;
  size: number;
  createdAt: string;
};

export interface ICollectionData {
  listingAmount: number | null;
  floorPrice: number | null;
  topBid: number | null;
  currentBid: TUserBid | null;
}

export interface ICollectionConfig {
  barrier?: number;
  bank?: number;
}

export type Collections = { [key: string]: ICollection };

export interface ICollection {
  collectionName: string;
  collectionAddress: string;
  status: ECollectionStatus;
  mode: ECollectionMode;
  config: ICollectionConfig;
  data: ICollectionData;
  bidsData: TBidsData;
  activity: TActivity[];
}
