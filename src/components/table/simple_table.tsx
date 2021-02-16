import './simple_table.css';

type TableProps = {
  children: JSX.Element | JSX.Element[];
  style?: { [key: string]: string };
};

export function SimpleTable(props: TableProps) {
  const { children, style } = props;

  return (
    <table className="simple-table" style={style}>
      {children}
    </table>
  );
}

type TableHeaderProps = {
  columns: ColumnSetting[];
  theadStyle?: { [key: string]: string };
  thStyle?: { [key: string]: string };
};

export function SimpleTableHeader(props: TableHeaderProps) {
  const { columns, theadStyle, thStyle } = props;
  const headers = columns.map(({ Header }) => (
    <th className="simple-table-th" style={thStyle}>
      {Header}
    </th>
  ));
  return (
    <thead className="simple-table-thead" style={theadStyle}>
      {headers}
    </thead>
  );
}

export function SimpleTableBody(props: TableProps) {
  const { children, style } = props;
  return (
    <tbody className="simple-table-body" style={style}>
      {children}
    </tbody>
  );
}

type TableRowProps = {
  columns: ColumnSetting[];
  row: { [key: string]: string };
  trStyle?: { [key: string]: string };
};

export function SimpleTableRow(props: TableRowProps) {
  const { columns, row, trStyle } = props;
  const rowCells = columns.map(({ accessor, style }) => (
    <td className="simple-table-cell" style={style}>
      {row[accessor]}
    </td>
  ));
  return (
    <tr className="simple-table-row" style={trStyle}>
      {rowCells}
    </tr>
  );
}

export function useSimpleTable(
  columns: ColumnSetting[],
  rows: { [key: string]: string }[],
  options: {
    getId?: (row: { [key: string]: string }) => string;
    theadStyle?: { [key: string]: string };
    tbodyStyle?: { [key: string]: string };
    thStyle?: { [key: string]: string };
    trStyle?: { [key: string]: string };
  } = {},
) {
  const { getId = (row: { [key: string]: string }) => row.id, theadStyle, thStyle, trStyle, tbodyStyle } = options;
  const Header = () => <SimpleTableHeader columns={columns} theadStyle={theadStyle} thStyle={thStyle} />;
  const TableRows = rows.map((row) => (
    <SimpleTableRow key={getId(row)} trStyle={trStyle} columns={columns} row={row} />
  ));
  const TableBody = (props: { children: JSX.Element | JSX.Element[] }) => (
    <SimpleTableBody style={tbodyStyle}>{props.children}</SimpleTableBody>
  );

  return { Table: SimpleTable, Header, TableBody, TableRows };
}
