type Props = {
  children: JSX.Element | JSX.Element[];
};

const FormField = ({ children }: Props) => {
  return <div className="flex gap-2">{children}</div>;
};

export default FormField;
