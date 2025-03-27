import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { User } from "../../data/Data";
import InputInfoComponent from "../../components/InputInfoComponent";
import { putApi } from "../../api/Api";
import { changeImage, updateUser } from "../../redux/slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import { transStringToDate } from "../../utils/Utils";

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

  const userInfo = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();

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
  const handleErrorAvatar = () => {
    console.log("Fail to load image");
    setAvatar(require("../../../assets/images/user.png"));
  };

  //SAVE update
  const handleSaveUserInfo = async (data: User) => {
    const { username, dateOfBirth, ...dataWithOutUsername_Date } = data; //destructuring - nice way

    console.log("dateOfBirth ", dateOfBirth);
    console.log("dataWithOutUsername_Date", dataWithOutUsername_Date);

    const formattedData = {
      ...dataWithOutUsername_Date,
      dateOfBirth:
        typeof dateOfBirth === "string"
          ? transStringToDate(dateOfBirth)
          : dateOfBirth,
    };

    try {
      const resultAction = await dispatch(updateUser(formattedData));
      if (updateUser.fulfilled.match(resultAction)) {
        console.log("Update successfully", resultAction.payload);
        setUserData(resultAction.payload);
      } else {
        console.log("update failed", resultAction.payload);
      }
    } catch (error) {
      console.log("Error dispatching updateUser", error);
    }
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

      const formDataImg = new FormData();
      formDataImg.append("file", {
        uri: selectedImg,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);

      try {
        const resultAction = await dispatch(changeImage(formDataImg));
        if (changeImage.fulfilled.match(resultAction)) {
          console.log("Update Image successfully", resultAction.payload);
          setAvatar({ uri: selectedImg });
        } else {
          console.log("update failed", resultAction.payload);
        }
      } catch (error) {
        console.log("Fail to updateImage", error);
      }
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
