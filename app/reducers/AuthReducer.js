
const INITIAL_STATE = { user: null, loading: false, error: '',code:8 }



/*
const initialState = {
  items: [],
  loading: false,
  error: null
};*/

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'start_login':
   
      return {...INITIAL_STATE, loading: true }
    case 'login_failed':
      return {...INITIAL_STATE, loading: false, error: action.error ,code:1 }
    case 'login_sucess':
    console.log("user",action.payload.name);
      return {...INITIAL_STATE, loading: false, user: action.payload,code:0  }
    default:
      return state;
  }
}
