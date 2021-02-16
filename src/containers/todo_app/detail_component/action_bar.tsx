import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '../../../intl';
import { Bar, BarLeft, BarRight } from '../../../components/layout';
import { Button } from '../../../components/button';
import { getTodoStore, setTodo } from '../store';
import { RootStore } from '../../../store/reducers';
import { addToList } from '../store/action_list';

import '../detail.css';

export function ActionBar() {
  const intl = useIntl();
  const history = useHistory();
  const submitName = intl.get('submit');
  const closeName = intl.get('close');
  const todoDetail = useSelector((storeState: RootStore) => getTodoStore(storeState).todoDetail);

  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(addToList(todoDetail));
    dispatch(setTodo({}));
  };

  const onClose = () => {
    history.push('/todo');
  };

  const disabled = !todoDetail.content || !todoDetail.summary;

  return (
    <Bar>
      <BarLeft>
        <Button onClick={onClose}>{closeName}</Button>
      </BarLeft>
      <BarRight>
        <Button onClick={onSubmit} disabled={disabled}>
          {submitName}
        </Button>
      </BarRight>
    </Bar>
  );
}
