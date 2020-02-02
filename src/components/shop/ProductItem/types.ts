export interface IProps {
  image: string;
  title: string;
  price: number;
  onViewDetail(): void;
  onAddToCart(): void;
}
