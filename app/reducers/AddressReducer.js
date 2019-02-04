
const INITIAL_STATE = { data: [], dataReceiver: [], stateList: [], loading: false, error: '', code: 8 }

/*
const initialState = {
  items: [],
  loading: false,
  error: null we use '' for null object 
  and [] fro null arrya 
};*/

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'start_loading':
      return { ...INITIAL_STATE, loading: true }
    case 'api_failed':
      return { ...INITIAL_STATE, loading: false, error: action.error }


    case 'api_success':
      return { ...INITIAL_STATE, loading: false, data: action.payload, code: 0 }



    ///////////fro receiver
    case 'api_failed_receiver':
      return { ...INITIAL_STATE, loading: false, error: action.error }

    case 'api_success_receiver':
      return { ...INITIAL_STATE, loading: false, dataReceiver: action.payload, code: 0 }

    ////////////////for state 
    case 'api_success_state':
      console.log('redudersate', action.payload);
      return { ...INITIAL_STATE, loading: false, stateList: action.payload }
    ///////////add addresss case 'api_success_state':
    case 'api_success_add_address':
    console.log('api_success_add_address', 'yes');
      return { ...INITIAL_STATE, loading: false, code: 0 }


    default:
      return state;
  }
}
