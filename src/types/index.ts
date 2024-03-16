export interface ITrain {
    id: number;
    train_number: number;
    passengers_count: number;
    from_country: string;
    to_country: string;
    start_time: number;
    ticket_price: number;
  }
  
  export interface IPassenger {
    id: number;
    name: string;
    phone: number;
    trainId: number;
  }
  