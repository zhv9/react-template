type Props =
  | {
      onClick: () => void;
      children?: JSX.Element | JSX.Element[] | string;
    }
  | React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button(props: Props) {
  const { children, onClick = () => {}, ...rest } = props;
  const onClickHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(e);
  };
  return (
    <button type="button" onClick={onClickHandle} {...rest}>
      {children}
    </button>
  );
}
