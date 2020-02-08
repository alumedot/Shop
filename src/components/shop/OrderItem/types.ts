import { IOrderItem } from 'store/orders/types/instance';


export interface IProps {
  items: IOrderItem[],
  amount: number;
  date: string;
}
