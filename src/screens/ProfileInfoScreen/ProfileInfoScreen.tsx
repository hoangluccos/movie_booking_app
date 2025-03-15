import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../data/Data";
import InputInfoComponent from "../../components/InputInfoComponent";
import { putApi } from "../../api/Api";
import { setUser } from "../../redux/slices/userSlice";
import * as ImagePicker from "expo-image-picker";

interface UserState {
  user: User | null;
}
type ImageSource =
  | {
      uri: string;
    }
  | number; //require tra ve number
const ProfileInfoScreen = () => {
  //Dimensions
  const widthDevice = Dimensions.get("window").width;
  const heightDevice = Dimensions.get("window").height;

  const userInfo = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<User>({
    username: userInfo?.user?.username || "", // Bắt buộc
    email: userInfo?.user?.email || "", // Bắt buộc
    avatar: userInfo?.user?.avatar, // Tùy chọn
    dateOfBirth: userInfo?.user?.dateOfBirth, // Tùy chọn
    firstName: userInfo?.user?.firstName, // Tùy chọn
    lastName: userInfo?.user?.lastName, // Tùy chọn
  }); //interface User có vài trường bắt buộc phải có
  console.log(userInfo);

  //avatar
  const [avatar, setAvatar] = useState<ImageSource>(
    userInfo?.user?.avatar
      ? { uri: userInfo.user.avatar }
      : require("../../../assets/images/user.png")
  );
  // Hàm chuyển chuỗi "dd-mm-yyyy" thành Date
  const parseDateFromString = (dateString: string): Date => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const transStringToDate = (stringDate: string) => {
    const parts = stringDate.split("/");
    const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return dateObject;
  };
  const handleErrorAvatar = () => {
    console.log("Fail to load image");
    setAvatar(require("../../../assets/images/user.png"));
  };
  //SAVE update
  const handleSaveUserInfo = (data: User) => {
    const { username, dateOfBirth, ...dataWithOutUsername_Date } = data; //destructuring - nice way
    // if (typeof dateOfBirth === "string") {
    // console.log("string roi!!!!");
    // transStringToDate(dateOfBirth);
    // setUserData({ ...userData, dateOfBirth: transStringToDate(dateOfBirth) });
    // }
    console.log("dateOfBirth ", dateOfBirth);
    console.log("dataWithOutUsername_Date", dataWithOutUsername_Date);

    typeof dateOfBirth !== "string"
      ? putApi(
          "/api/users/bio",
          { dateOfBirth, ...dataWithOutUsername_Date },
          true,
          (error, response) => {
            if (error) {
              console.log("error", error);
            } else {
              console.log("Chinh sua Date");
              console.log("put user data API successful");
              console.log("response update user:", response.result);
              dispatch(setUser(response.result));
            }
          }
        )
      : putApi(
          "/api/users/bio",
          {
            dateOfBirth: transStringToDate(dateOfBirth),
            ...dataWithOutUsername_Date,
          },
          true,
          (error, response) => {
            if (error) {
              console.log("error", error);
            } else {
              console.log("Khong chinh sua Date");
              console.log("put user data API successful");
              console.log("response update user:", response.result);
              dispatch(setUser(response.result));
            }
          }
        );
  };
  const handlePick = async () => {
    // No permissions request is necessary for launching the image library
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry we need your grant to access the library");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled && result?.assets.length > 0) {
      const selectedImg = result.assets[0].uri;
      setAvatar({ uri: selectedImg });

      const formDataImg = new FormData();
      formDataImg.append("file", {
        uri: selectedImg,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);
      putApi("/api/users/avatar", formDataImg, true, (error, response) => {
        if (error) console.log(error);
        else {
          console.log("Put api upload image successfully");
          console.log(response.result);
        }
      });
    }
  };
  return (
    <View className="bg-gray-600 flex flex-1">
      <View className="bg-yellow-400 h-[150] w-full"></View>
      <View className="flex justify-center items-center">
        <View className="  flex h-auto" style={{ width: widthDevice * 0.9 }}>
          <View className="relative flex justify-center items-center">
            <TouchableOpacity
              onPress={() => handlePick()}
              className="flex justify-center items-center"
            >
              <Image
                source={avatar}
                className="w-[120] h-[120] bg-yellow-50 absolute top-[-50] rounded-[50]"
                onError={handleErrorAvatar}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="text-xl mt-[80] mb-[10] font-bold">
              {userInfo?.user?.username}
            </Text>
          </View>
          <InputInfoComponent
            title="Email"
            value={userData.email || ""}
            placeholder="Email"
            onChangeValue={(value) =>
              setUserData({ ...userData, email: value })
            }
            isInfoUser={true}
          />
          <InputInfoComponent
            title="Date of Birth"
            valueDate={userInfo?.user?.dateOfBirth}
            placeholder="dd/mm/yyyy"
            onChangeValue={(value) => {
              console.log("new db", value);
              console.log("new date", transStringToDate(value));
              setUserData({
                ...userData,
                dateOfBirth: transStringToDate(value),
              });
            }}
            isInfoUser={true}
            isDob={true}
          />
          <InputInfoComponent
            title="First name"
            value={userData.firstName || ""}
            placeholder="First name"
            onChangeValue={(value) =>
              setUserData({ ...userData, firstName: value })
            }
            isInfoUser={true}
          />
          <InputInfoComponent
            title="Last name"
            value={userData.lastName || ""}
            placeholder="Last name"
            onChangeValue={(value) =>
              setUserData({ ...userData, lastName: value })
            }
            isInfoUser={true}
          />

          <TouchableOpacity
            className="bg-yellow-300 p-4 w-[100] h-[50]
            self-center rounded-[30]"
            onPress={() => handleSaveUserInfo(userData)}
            // onPress={() => console.log(userData)}
          >
            <Text className="my-auto mx-auto">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoScreen;
