interface ITodo {
  id?: number;
  summary?: string;
  content?: string;
}

type TodoStore = {
  todoDetail: ITodo;
  todoList: ITodo[];
};

type TodoDetailAction = {
  type: string;
  payload: ITodo;
};

type TodoSummaryListAction = {
  type: string;
  payload: ITodo[];
};

type TodoActions = TodoDetailAction | TodoSummaryListAction;

type TodoDispatchType = (args: TodoActions) => TodoActions;
