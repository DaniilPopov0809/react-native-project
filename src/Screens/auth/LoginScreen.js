import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import backgroundImg from "../../image/bg.png";
import { useDispatch } from "react-redux";
import { authLogInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = () => {
    dispatch(authLogInUser(state));
    setState(initialState);
    keyboardHide();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImg} style={styles.background}>
          <View style={styles.formContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : 0}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -97 : 144,
                }}
              >
                <Text style={styles.formTitle}>Войти</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Адрес электронной почты"
                    value={state.email}
                    onFocus={() => setIsShowKeyboard(true)}
                    onSubmitEditing={keyboardHide}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                  <View style={styles.containerInputPassword}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.showPassword}
                      onPress={toggleShowPassword}
                    >
                      <Text style={styles.textShowPassword}>Показать</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.input, styles.lastInput]}
                      secureTextEntry={!isShowPassword}
                      placeholder="Пароль"
                      value={state.password}
                      onFocus={() => setIsShowKeyboard(true)}
                      onSubmitEditing={keyboardHide}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.toLogin}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  formContainer: {
    justifyContent: "flex-end",
    position: "relative",

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  form: {
    marginHorizontal: 16,
  },
  formTitle: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  input: {
    marginBottom: 16,
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
  },
  lastInput: {
    marginBottom: 43,
  },

  containerInputPassword: {
    position: "relative",
  },

  showPassword: {
    position: "absolute",
    zIndex: 999,
    right: 16,
    top: 16,
  },

  textShowPassword: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonTitle: {
    fontFamily: "Roboto",
    color: "#FFFFFF",
    fontSize: 16,
  },

  toLogin: {
    fontFamily: "Roboto",
    textAlign: "center",
    color: "#1B4371",
  },
});

export default LoginScreen;
