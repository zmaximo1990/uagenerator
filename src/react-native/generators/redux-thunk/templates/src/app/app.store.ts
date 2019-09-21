import {
  createStore,
  applyMiddleware,
  combineReducers,
} from "../home/home/redux/node_modules/redux";
import thunkMiddleware from "redux-thunk";
import { ApplicationState } from "../common/common.types";
import homeReducer from "../home/home/redux/home.reducers";

export default function configureStore() {
  const rootReducer = combineReducers<ApplicationState>({
    home: homeReducer,
    // TODO: Other reducers here.
  });

  // TODO: add DevTools.
  return createStore(
    rootReducer,
    applyMiddleware(
      // apiService,
      thunkMiddleware
      // createLogger( true ),
    )
  );
}
