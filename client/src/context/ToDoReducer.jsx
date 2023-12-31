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
        taskList: state.taskList.filter((task) => task._id !== action.payload),
      };
    case "CREATE_TASK":
      return {
        ...state,
        taskList: [action.payload, ...state.taskList],
      };
    case "EDIT_TASK":
      return {
        ...state,
        item: action.payload.item,
        edit: true,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task._id === action.payload.id) {
            return action.payload.data;
          }
          return task;
        }),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload.userId,
        user_OId: action.payload.user_OId,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_EXISTING_USER_STATUS":
      return {
        ...state,
        isExistingUser: action.payload,
      };
    case "SET_UPDATED_COUNT":
      return {
        ...state,
        priority: action.payload.priorityCount,
        remaining: action.payload.remainingCount,
        completed: action.payload.completedCount,
      };
    default:
      return state;
  }
};
export default TodoReducer;
