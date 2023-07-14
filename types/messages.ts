export interface Message {
  content: string;
  from: string;
  date: Date;
  isAutomated?: boolean;
}
