type Props = {
  name: string;
  children: string;
};

const FormLabel = ({ name, children }: Props) => {
  return (
    <label className="text-white" htmlFor={name}>
      {children}
    </label>
  );
};

export default FormLabel;
