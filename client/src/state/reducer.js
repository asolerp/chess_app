export const STATUS_CHANGED = "STATUS_CHANGED";
export const ADD_TOURNAMENT = "ADD_TOURNAMENT";

const initialState = {
  status: 'live',
  tournament: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload,
      };
    case ADD_TOURNAMENT:
      return {
        status: true,
        tournament: action.payload
      }
  }
  return state;
};