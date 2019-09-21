import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import FeedScreen from "../home/home";
import PlaceLocatorModal from "../common/components/place-locator/place-locator.component";
import authLoadingScreen from "../auth/auth-loading/auth-loading.screen";

const AppStack = createStackNavigator({ Home: FeedScreen });

const RootAppStack = createStackNavigator(
  {
    App: AppStack,
    PlaceLocator: PlaceLocatorModal,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: authLoadingScreen,
      App: RootAppStack,
      // Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);

export default navigator;
