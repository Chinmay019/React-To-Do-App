const TodoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS_FROM_DB":
      return {
        ...state,
        taskList: action.payload,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    case "ADD_ITEM":
      return {
        ...state,
        taskList: [action.payload, ...state.taskList],
      };
    case "EDIT_ITEM":
      return {
        ...state,
        item: action.payload.item,
        edit: true,
      };
    case "UPDATE_PRIORITY":
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id === action.payload) {
            task.priority = !task.priority;
          }
          return task;
        }),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.data }
            : task
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "COMPLETE_ITEM":
      return {
        ...state,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
export default TodoReducer;
