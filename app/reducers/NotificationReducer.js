
const INITIAL_STATE = { data: [],dataReceiver: [], loading: false, error: '',code:8 }

/*
const initialState = {
  items: [],
  loading: false,
  error: null we use '' for null object 
  and [] fro null arrya 
};*/

export default (state = INITIAL_STATE, action) => {

  switch(action.type) {
    case 'start_loading':
      return {...INITIAL_STATE, loading: true }
    case 'api_failed_notification':
      return {...INITIAL_STATE, loading: false, error: action.error  }


    case 'api_success_notification':

      return {...INITIAL_STATE, loading: false, data: action.payload,code:0  }



    default:
      return state;
  }
}
