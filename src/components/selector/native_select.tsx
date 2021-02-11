type Option = { label: string; value: string };

type Props = {
  id?: string;
  name: string;
  options: Option[];
  selected?: Option;
  onSelected: (value: string) => unknown;
};

export function NativeSelect(props: Props) {
  const { id, name, options, selected, onSelected } = props;
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    return onSelected(event.target.value);
  }
  return (
    <select id={id} name={name} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option value={value} selected={selected?.value === value}>
          {label}
        </option>
      ))}
    </select>
  );
}
