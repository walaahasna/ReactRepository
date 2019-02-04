
import axios from 'axios';
import { AsyncStorage } from 'react-native';

//////////addresssender
const onSuccess = (dispatch, address) => {
  dispatch({ type: 'api_success', payload: address.body.data })
};


const handleResponse = (dispatch, address) => {
  if (address.code === 0) {
    onSuccess(dispatch, address)

  } else {
      onFailed(dispatch, address.message);
  }
}

const onFailed = (dispatch, errorMessage) => {
  dispatch({ type: 'api_failed', error: errorMessage })
};



//////////  addressstate 
const onSuccessState = (dispatch, state) => {
  dispatch({ type: 'api_success_state', payload: state.body })
};

const handleResponseState = (dispatch, state) => {
  if (state.code === 0) {
    onSuccessState(dispatch, state)

  } else {
    console.log("fail", "yes");
   // onFailedState(dispatch, address.message);
  }
}



////////// addressReceiver

const onSuccessReceiver = (dispatch, address) => {
  dispatch({ type: 'api_success_receiver', payload: address.body.data })
};

const onFailedReceiver = (dispatch, errorMessage) => {
  dispatch({ type: 'api_failed_receiver', error: errorMessage })
};

 
const handleResponseAddressReceiver = (dispatch, address) => {
  if (address.code === 0) {
    onSuccessReceiver(dispatch, address)

  } else {
    onFailedReceiver(dispatch, address.message);
  }
}


////////// addAddress

const onSuccessAddAddress = (dispatch, address) => {
  dispatch({ type: 'api_success_add_address', payload: address.body })
};

const onFailedAddAddress = (dispatch, errorMessage) => {
  dispatch({ type: 'api_failed_add_address', error: errorMessage })
};

 
const handleResponseAddAddress = (dispatch, address) => {
  if (address.code === 0) {
    onSuccessAddAddress(dispatch, address)

  } else {
    onFailedAddAddress(dispatch, address.message);
  }
}


/////////////////all address method 

export const getAllAddress = (offset) => {
  console.log('page', offset);

  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'start_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/addresses?filter=type%3Asender&page=' + offset;

      console.log('url', url);
      axios.get(url, // This is the body part
        {
          headers: {
            'Authorization': value
            //other header fields
          }
        }
      )
        .then((response) => {

          console.log('reponse_address', response.data);

          handleResponse(dispatch, response.data, offset);
        })
        .catch((error) => {
          console.log(error);
        });
    })
      .then(res => {
        console.log('error', res);
        //do something else
      });


    console.log('token', AsyncStorage.getItem('app_token'))
  }
}


export const getAllAddressReceiver = (offset) => {
  console.log('page', offset);

  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'start_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/addresses?filter=type%3Arecipient&page=' + offset;

      console.log('url', url);
      axios.get(url, // This is the body part
        {
          headers: {
            'Authorization': value
            //other header fields
          }
        }
      )
        .then((response) => {

          console.log('getAllAddressReceiver', response.data);

          handleResponseAddressReceiver(dispatch, response.data, offset);
        })
        .catch((error) => {
          console.log(error);
        });
    })
      .then(res => {
        console.log('error', res);
        //do something else
      });


    console.log('token', AsyncStorage.getItem('app_token'))
  }
}


export const getState = () => {

  return (dispatch) => {
    // for show loaing
    

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/states';

      console.log('url', url);
      axios.get(url, // This is the body part
        {
          headers: {
            'Authorization': value
            //other header fields
          }
        }
      )
        .then((response) => {

          console.log('getState', response.data);

          handleResponseState(dispatch, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
      .then(res => {
        console.log('error', res);
        //do something else
      });


    console.log('token', AsyncStorage.getItem('app_token'))
  }
}



export const addNewAddress = (lat, lng, state_id, city, comment, type, name, mobile, street_one) => {


  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'start_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/addresses';

      console.log('url', url);
      axios.post(url, { lat, lng, state_id, city, comment, type, name, mobile, street_one },
        {
          headers: {
            'Authorization': value
            //other header fields
          }
        }
      )
        .then((response) => {

          console.log('addNewAddressSender', response.data);

          handleResponseAddAddress(dispatch, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
      .then(res => {
        console.log('error', res);
        //do something else
      });


    console.log('token', AsyncStorage.getItem('app_token'))
  }
}




