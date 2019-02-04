
const INITIAL_STATE = { dataAbout: '', loading: false, error: '',code:8 }



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
    case 'About_failed':
      return {...INITIAL_STATE, loading: false, error: action.error ,code:1 }
    case 'About_sucess':
      return {...INITIAL_STATE, loading: false, dataAbout: action.payload,code:0  }
    default:
      return state;
  }
}
