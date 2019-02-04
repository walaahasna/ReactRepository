
import axios from 'axios';

const onAboutSuccess = (dispatch, about) => {

  dispatch({ type: 'About_sucess', payload: about.body })


};



const onAboutFailed = (dispatch, errorMessage) => {
  dispatch({ type: 'About_failed', error: errorMessage })
};


const handleResponse = (dispatch, data) => {
  if (data.code === 0) {
    onAboutSuccess(dispatch, data)

  } else {
    onAboutFailed(dispatch, data.message);
  }
}



//this fucntion its thuck  allow
export const getAbout = () => {
  return (dispatch) => {
    // for show loaing
    // dispatch({ type: 'start_login' });

    //Call the back-end API
    //Please do not spam/abuse it so others can use it as well.

    axios.get('https://apidev.wasel.biz/v1/user/about-us', {

    })
      .then((response) => {
        console.log(response.data);
        handleResponse(dispatch, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
