import React, { useEffect } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { AntDesign } from "@expo/vector-icons";
import { GOOGLE_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

interface GoogleLoginButtonProps {
  onLoginSuccess: (token: string) => void;
}

const GoogleLoginButton = ({ onLoginSuccess }: GoogleLoginButtonProps) => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  console.log("Redirect URI:", redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      redirectUri,
      responseType: "code",
      scopes: ["openid", "profile", "email"],
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (!response) return;

      if (response.type === "success") {
        const authCode = response.params.code;
        try {
          const res = await fetch(
            `http://192.168.1.12:3000/api/auth/outbound/authentication?code=${authCode}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();

          if (data.code === 200) {
            onLoginSuccess(data.result.token);
            Alert.alert("Đăng nhập thành công!");
          } else {
            Alert.alert(
              "Đăng nhập thất bại",
              data.message || "Lỗi không xác định"
            );
          }
        } catch (err) {
          console.error("Lỗi gửi mã xác thực:", err);
          Alert.alert("Lỗi", "Không thể gửi mã xác thực lên backend.");
        }
      } else if (response.type === "error") {
        console.error("Lỗi OAuth:", response.params);
        Alert.alert(
          "Lỗi",
          `Đăng nhập thất bại: ${
            response.params.error_description || "Lỗi không xác định"
          }`
        );
      } else if (response.type === "dismiss") {
        Alert.alert("Đã hủy", "Bạn đã hủy đăng nhập.");
      }
    };

    handleAuth();
  }, [response, onLoginSuccess]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (request) {
          promptAsync({ useProxy: true });
        } else {
          Alert.alert("Lỗi", "Yêu cầu đăng nhập chưa sẵn sàng.");
        }
      }}
      disabled={!request}
      className="flex flex-row items-center justify-center gap-x-2 p-3 bg-slate-400 rounded-[50]"
    >
      <AntDesign name="google" size={20} color="white" />
      <Text className="text-white">Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;
