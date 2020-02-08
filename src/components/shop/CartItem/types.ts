export interface IProps {
  quantity: number;
  title: string;
  sum: number;
  deletable?: boolean;
  onRemove?(): void;
}
