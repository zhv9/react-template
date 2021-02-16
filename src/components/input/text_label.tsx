type Props = {
  inputId: string;
  labelText: string;
};

export default function TextLabel(props: Props) {
  const { inputId, labelText = '' } = props;
  return (
    <label id={`${inputId}-label`} htmlFor={inputId}>
      {labelText}
    </label>
  );
}
