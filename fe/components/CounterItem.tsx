import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";


interface CounterItemProps {
  id: string;
  name: string;
  count: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}
export function CounterItem({
  id,
  name,
  count,
  onIncrement,
  onDecrement,
}:CounterItemProps) {
  return (
    <li className="flex items-center justify-between" key={id}>
      <div>{name}</div>

      <div className="flex items-center">
        <Button
          onClick={() => onDecrement(id)}
          className="px-5 py-4 h-0 rounded-lg text-2xl"
        >
          <Minus />
        </Button>

        <span className="mx-2">{count}</span>

        <Button
          onClick={() => onIncrement(id)}
          className="px-5 py-4 h-0 text-2xl"
        >
          <Plus />
        </Button>
      </div>
    </li>
  );
}
