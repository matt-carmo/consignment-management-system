import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  count: number;
  name: string;
  max: number;
  price: number;
}

interface CounterItemProps {
  items: Item[];
  onChangeItens: (items: Item[]) => void;
}

export function CounterItem({
  items,
  onChangeItens,

}: CounterItemProps) {

  
  const [itemsMutated, setItemsMutated] = useState<Item[]>([]);

  useEffect(() => {
    if(!itemsMutated.length){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItemsMutated(items)
    }
  }, [items, itemsMutated.length]);
  if(!itemsMutated) return null
  const updateItem = (id: string, newCount: number) => {
    setItemsMutated((prev) =>{
      const item = prev.map((i) => (i.id === id ? { ...i, count: newCount } : i))
      queueMicrotask(() => {        
        onChangeItens(item);
      })
      return item
    }
    );

  };

  return (
    <ul>
      {itemsMutated.map((item) => {
        const increment = () => {
          if (item.count < item.max) {
            updateItem(item.id, item.count + 1);
          }
        };

        const decrement = () => {
          if (item.count > 0) {
            updateItem(item.id, item.count - 1);
          }
        };

        return (
          <li key={item.id}>
            <div className='flex items-center justify-between mb-1.5'>
              <span>{item.name}</span>

              <div className='flex items-center'>
                <Button
                  onClick={decrement}
                  className='px-5 py-4 h-0 rounded-lg text-2xl'
                >
                  <Minus />
                </Button>

                <span className='mx-2'>{item.count}</span>

                <Button onClick={increment} className='px-5 py-4 h-0 text-2xl'>
                  <Plus />
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

