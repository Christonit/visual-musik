
export const IS_LOGGED = "SESSION/IS_LOGGED";
export const NOT_LOGGED = "SESSION/NOT_LOGGED";

export const authSession = (state : boolean = false, action : {type : string}) => {
  switch (action.type) {
    case IS_LOGGED:
      return true;
    case NOT_LOGGED:
      return false;
    default:
      return state;
  }
};