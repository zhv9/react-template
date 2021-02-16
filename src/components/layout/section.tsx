import './section.css';

type Props = {
  children?: JSX.Element | JSX.Element[];
  style?: { [key: string]: string };
  className?: string;
};

export function Section(props: Props) {
  const { children, style, className } = props;
  return (
    <section className={className ? `section-container ${className}` : 'section-container'} style={style}>
      {children}
    </section>
  );
}
