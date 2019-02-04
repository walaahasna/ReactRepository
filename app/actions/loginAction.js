
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const onLoginSuccess = (dispatch, user) => {
  AsyncStorage.setItem('app_token',user.body.token.api_token)
    .then(() => {
      console.log('dispatch','yes');
      dispatch({ type: 'login_sucess', payload:user.body.auth })

    });

    AsyncStorage.setItem('mobile',user.body.auth.mobile)
    .then(() => {
      console.log('mobile',user.body.auth.mobile);
   
    });

    AsyncStorage.setItem('name',user.body.auth.name)
    .then(() => {
      console.log('name',user.body.auth.name);
   
    });
    
};



const onLoginFailed = (dispatch, errorMessage) => {
  console.log("onLoginFailed",errorMessage);
  //payload: { error }
  dispatch({ type: 'login_failed', error: errorMessage})
};


const handleResponse = (dispatch, data) => {
  if (data.code===0) {
    console.log("sucess",data);
    console.log("code",data.code);
    onLoginSuccess(dispatch, data)
    ///payload: { products }
    
  }else {
    console.log('failmessage',data.message);
    console.log("fail",data);
    onLoginFailed(dispatch, data.message);
  }
}



//this fucntion its thuck  allow
export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    // for show loaing
    dispatch({ type: 'start_login' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.

  axios.post('https://apidev.wasel.biz/v1/user/login', {
      username,
      password
    })
    .then((response) => {
      console.log(response.data);
       // console.log('walaa',response.data.body.token.api_token);
        console.log('walaa',response.data.code);
  handleResponse(dispatch,response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
}
