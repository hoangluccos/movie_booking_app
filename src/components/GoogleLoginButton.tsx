import React, { useEffect } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from "@expo/vector-icons";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";
// import { GOOGLE_CLIENT_ID } from "@env";

// ✅ Expo proxy yêu cầu phải có dòng này
WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

interface GoogleLoginButtonProps {
  onLoginSuccess: (token: string) => void;
}

const GoogleLoginButton = ({ onLoginSuccess }: GoogleLoginButtonProps) => {
  const redirectUri = `https://auth.expo.io/@hoangluccos/movie_booking_app`;

  console.log("🔁 Redirect URI:", redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.IdToken,
      clientId:
        "715291353144-ft6d5b07t3rdkgvvaa322q5tbovq60hd.apps.googleusercontent.com",
      redirectUri,
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      onLoginSuccess(id_token);
      Alert.alert("✅ Thành công", "Đăng nhập Google thành công!");
    } else if (response?.type === "error") {
      Alert.alert("❌ Lỗi", "Không thể đăng nhập với Google");
      console.log("Google login error:", response.error);
      console.log("Error details:", response);
    }
  }, [response]);

  return (
    <TouchableOpacity
      onPress={() => promptAsync()}
      disabled={!request}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        backgroundColor: "#4285F4",
        borderRadius: 25,
        gap: 10,
      }}
    >
      <AntDesign name="google" size={20} color="white" />
      <Text style={{ color: "white", fontWeight: "bold" }}>
        Đăng nhập với Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;
