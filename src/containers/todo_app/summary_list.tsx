import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar, BarRight } from '../../components/layout';
import { useSimpleTable } from '../../components/table';
import { useIntl } from '../../intl';
import { RootStore } from '../../store/reducers';
import { columnSetting } from './config';
import { getTodoStore } from './store';

export function SummaryList() {
  const intl = useIntl();
  const rowsData = useSelector((storeState: RootStore) => getTodoStore(storeState).todoList) as {
    [key: string]: string;
  }[];
  function getId(row: { [key: string]: string }) {
    return row.summary;
  }

  const columns = columnSetting.map((column) => {
    return { ...column, Header: intl.get(column.intlCode) };
  });
  const { Table, Header, TableBody, TableRows } = useSimpleTable(columns, rowsData, { getId });

  return (
    <>
      <Bar>
        <Table>
          <Header />
          <TableBody>{TableRows}</TableBody>
        </Table>
      </Bar>
      <Bar>
        <BarRight>
          <Link to="/todo/detail">{intl.get('add_todo')}</Link>
        </BarRight>
      </Bar>
    </>
  );
}
