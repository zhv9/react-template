import './bar.css';

type Props = {
  children?: JSX.Element | JSX.Element[];
  style?: { [key: string]: string };
  className?: string;
};

export function Bar(props: Props) {
  const { children, style, className } = props;
  return (
    <div className={className ? `bar-container ${className}` : 'bar-container'} style={style}>
      {children}
    </div>
  );
}
export function BarLeft(props: Props) {
  const { children, style, className } = props;
  return (
    <div className={className ? `left-container ${className}` : 'left-container'} style={style}>
      {children}
    </div>
  );
}
export function BarRight(props: Props) {
  const { children, style, className } = props;
  return (
    <div className={className ? `right-container ${className}` : 'right-container'} style={style}>
      {children}
    </div>
  );
}
