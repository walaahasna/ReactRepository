
import axios from 'axios';
import { AsyncStorage } from 'react-native';


const onSuccess = (dispatch, address) => {
  //dipatc action with type and payoad data 
  console.log("onSuccessorder", "yes");
  dispatch({ type:'p_success', payload: address.body.data })
};

const onSuccessTime = (dispatch, time) => {
  //dipatc action with type and payoad data 
  console.log("onSuccessorder", "yes");
  dispatch({ type:'p_success_drop', payload: time.body.drop_transit_times})
  dispatch({ type:'p_success_pick', payload: time.body.pick_transit_times})
};
   
const onSuccessaddPackageNow = (dispatch, res) => {
  //dipatc action with type and payoad data 
  console.log("onSuccessorder", "yes");
  dispatch({ type:'p_success_add_package', payload: res.body})
 
};
const onFailed = (dispatch, errorMessage) => {
  //payload: { error }
  dispatch({ type: 'p_failed', error: errorMessage })
};


const onFailedaddPackageNow = (dispatch, errorMessage) => {
  //payload: { error }
  dispatch({ type: 'p_failed_add_apackage', error: errorMessage })
};



const handleResponse = (dispatch, address) => {
  if (address.code === 0) {
    console.log("onSuccess", "yes");
    onSuccess(dispatch, address,)

  } else {
    ///payload: { products }
    console.log("fail", "yes");
    onFailed(dispatch, address.message);
  }
}

const handleResponseTime = (dispatch, time) => {
  if (time.code === 0) {
    console.log("onSuccess", "yes");
    onSuccessTime(dispatch, time)

  } else {
    ///payload: { products }
    console.log("fail", "yes");
   // onFailedTime(dispatch, time.message);
  }
}


const handleResponseaddPackageNow = (dispatch, res) => {
  if (res.code === 0) {
    onSuccessaddPackageNow(dispatch, res)
  } else {
    console.log("fail", "yes");
    onFailedaddPackageNow(dispatch, res.message);
  }
}






export const getAllAvailableTime= () => {

  return (dispatch) => {
    // for show loaing
   // dispatch({ type: 'p_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/shippings/available-times';

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

          console.log('reponse_time', response.data);

          handleResponseTime(dispatch, response.data);
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






export const getAllPackages = (offset) => {
  console.log('page', offset);

  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'p_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/packages?with=source|target?page=' + offset;

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

          console.log('reponse_time', response.data);

          handleResponse(dispatch, response.data);
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



export const addPackageNow= (source_address,target_address,weight,pick_transit_time,drop_transit_time) => {
const type='document';
  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'p_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/packages';

      console.log('url', url);
      axios.post(url,{source_address,target_address,weight,pick_transit_time,drop_transit_time,type}, // This is the body part
        {
          headers: {
            'Authorization': value
            //other header fields
          }
        }
      )
        .then((response) => {

          console.log('reponse_time', response.data);

          handleResponseaddPackageNow(dispatch, response.data);
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
