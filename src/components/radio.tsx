export interface RadioButtonProps<T extends string> {
  options: T[];
  selected: T | null;
  setSelected: (x: T | null) => void;
}

export const RadioButton = <T extends string>(props: RadioButtonProps<T>) => {
  return (
    <div>
      {props.options.map((opt) => (
        <button>{opt}</button>
      ))}
    </div>
  );
};
