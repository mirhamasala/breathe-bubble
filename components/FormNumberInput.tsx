type Props = {
  name: string;
  onValueChange: (value: number) => void;
};

const FormNumberInput = ({ name, onValueChange }: Props) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(event.target.value));
  };

  return (
    <input
      id={name}
      name={name}
      type="number"
      min={0}
      onChange={handleOnChange}
    />
  );
};

export default FormNumberInput;
