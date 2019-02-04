
import axios from 'axios';
import { AsyncStorage } from 'react-native';


const onSuccess = (dispatch, notification) => {
  //dipatc action with type and payoad data 
  console.log("onSuccess", "yes");
  dispatch({ type: 'api_success_notification', payload: notification.body.data })
};



const onFailed = (dispatch, errorMessage) => {
  //payload: { error }
  dispatch({ type: 'api_failed_notification', error: errorMessage })
};


const handleResponse = (dispatch, notification) => {
  if (notification.code === 0) {
    console.log("onSuccess", "yes");
    onSuccess(dispatch, notification)

  } else {
    console.log("fail", "yes");
    onFailed(dispatch, notification.message);
  }
}



export const getAllNotification = () => {

  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'start_loading' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.
    AsyncStorage.getItem("app_token").then((value) => {
      console.log('addresstoken', value);
      const url = 'https://apidev.wasel.biz/v1/user/notifications';

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

          console.log('reponse_notification', response.data);

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


