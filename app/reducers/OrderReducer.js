
const INITIAL_STATE = { data: [], dataDrop: [], dataPick: [], loading: false, error: '', code: 5,addCode:20 }

/*
const initialState = {
  items: [],
  loading: false,
  error: null we use '' for null object 
  and [] fro null arrya 
};*/

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'p_loading':
      return { ...INITIAL_STATE, loading: true }


    case 'p_failed':
      return { ...INITIAL_STATE, loading: false, error: action.error }


    case 'p_success':
      return { ...INITIAL_STATE, loading: false, data: action.payload, code: 0 }

    ///////////////////for time 

    case 'p_success_drop':
      return { ...INITIAL_STATE, loading: false, dataDrop: action.payload, code: 0 }


    case 'p_success_pick':
    console.log('pick',action.payload);

      return { ...INITIAL_STATE, loading: false, dataPick: action.payload, code: 0 }

    ///////////////////for time 
    
    case 'p_success_add_package':
      return { ...INITIAL_STATE, loading: false, addCode: 0 }

    default:
      console.log('loading', 'default');
      return state;
  }
}
