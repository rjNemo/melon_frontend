import { ReactNode } from "react";

type ListProps<T> = { items: T[]; render: (item: T) => ReactNode };

export default function List<T>({ items, render }: ListProps<T>) {
  return <ul>{items.map((item) => render(item))}</ul>;
}
