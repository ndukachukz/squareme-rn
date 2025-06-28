export interface Notification {
  title: string;
  type:
    | "request"
    | "request_declined"
    | "request_accepted"
    | "withdrawal"
    | "request_sent";
  description: string;
  date: string;
  is_read: boolean;
}
