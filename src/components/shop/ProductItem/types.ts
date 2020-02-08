import { ReactNode } from 'react';


export interface IProps {
  image: string;
  title: string;
  price: number;
  children: ReactNode;
  onSelect(): void;
}
