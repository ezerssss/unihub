export interface Message {
  _id: number;
  text: string;
  user: {
    _id: number;
  };
  createdAt: Date;
}
