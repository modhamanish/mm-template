import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamsType } from '@app-types/navigation.types';

export const navigationRef =
  createNavigationContainerRef<NativeStackNavigationProp<ParamsType>>();

export async function navigate<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigateDeprecated(routeName, params));
  }
}

export async function navigateTab<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName],
) {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.popToTop());
    }
    navigate(routeName, params);
  }
}

export async function replace<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
}

export async function resetAndNavigate<RouteName extends keyof ParamsType>(
  routeName: RouteName,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      }),
    );
  }
}

export async function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export async function push<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export function prepareNavigation() {
  return navigationRef.isReady();
}
