export enum AuctionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Bid {
  amount: number;
}

export interface Auction {
  id: string;
  title: string;
  status: AuctionStatus;
  highestBid: Bid;
  createdAt: Date|string;

  startDate?: Date;
}