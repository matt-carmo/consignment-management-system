import { useState } from "react";
import { Input } from "./ui/input";

export default function BRLInput({
  onChange,
  value
}: {
  onChange: (value: number) => void;
  value?: number;
}) {
  const [_value, setValue] = useState(value || 0);

  function format(number: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(number / 100);
  }

  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const numeric = Number(onlyDigits);

    onChange(numeric / 100);
    setValue(numeric);
  }

  return (
    <>
    <Input
      type='text'
      value={format(_value)}
      onChange={onchange}
      placeholder='R$ 0,00'
    />
    </>
  );
}
