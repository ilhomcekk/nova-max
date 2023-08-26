import React from "react";
import "../../assets/scss/_cabinet.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
// import { updateProfile } from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { useDispatch } from "react-redux";
import { getMe, updateProfile } from "../.././redux/actions/userActions";
import { useEffect } from "react";

export default function Cabinet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [])

  const updateUser = useSelector((state) => state.user.user);
  return (
    <>
      <SecondNavbar />
      {updateUser?.id && (
        <UpdateProfile
          updateUser={updateUser}
          onClickUpdateData={(updateProfileData) => {
            dispatch(updateProfile(updateProfileData));
          }}
        />
      )}
    </>
  );
}
