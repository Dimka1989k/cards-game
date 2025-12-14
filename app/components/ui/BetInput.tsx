import { ChangeEvent } from "react";

interface InputBtnProps {
  value: string;
  disabled: boolean;
  buttons: string[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  onButtonClick: (action: string) => void;
}

export const BetInput= ({
  value,
  disabled,
  buttons,
  onInputChange,
  onInputBlur,
  onButtonClick,
}: InputBtnProps) => {
  return (
    <div className="flex bg-bet-input py-2 px-2 items-center  gap-2 rounded-lg mb-1.5">
      <input
        type="text"
        placeholder="0.00"
        inputMode="decimal"
        className="flex-1 min-w-0 h-8 text-rubik-bold py-2 rounded-sm focus:outline-none"
        value={value}
        onChange={onInputChange}
        onBlur={onInputBlur}
        disabled={disabled}
      />
      <div className="flex gap-1 ml-auto ">
        {buttons.map((btn) => (
          <button
            key={btn}
            disabled={disabled}
            onClick={() => onButtonClick(btn)}
            className="w-10 h-8 bg-bet-color rounded-sm text-xs text-gray-text  text-rubik hover:bg-btn-hover hover:text-btn-white cursor-pointer"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
