import { NavigationContainer } from "@react-navigation/native";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import { useRouting } from "../../../router";
import { selectStateChange } from "../../redux/auth/authSelectors";


const Main = () => {
  const stateChange = useSelector(selectStateChange);
 
  const dispatch = useDispatch();

  const routing = useRouting(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
