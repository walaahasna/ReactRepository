package com.waselreactproject;

import android.view.MotionEvent;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandler;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandlerInterface;
//import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
//import com.facebook.react.modules.core.PermissionListener; // <- add this import


public class MainActivity extends  ReactActivity implements TouchThroughTouchHandlerInterface {
  private PermissionListener listener; // <- add this attribute
  private TouchThroughTouchHandler touchThroughTouchHandler = new TouchThroughTouchHandler();

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WaselReactProject";
    }



  public TouchThroughTouchHandler getTouchThroughTouchHandler() {
    return touchThroughTouchHandler;
  }

  @Override
  public boolean dispatchTouchEvent(MotionEvent ev) {
    touchThroughTouchHandler.handleTouchEvent(ev);

    return super.dispatchTouchEvent(ev);
  }
}
