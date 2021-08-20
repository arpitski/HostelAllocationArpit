import React, { useEffect, useState } from "react";
import AlreadyBooked from "./AlreadyBooked";
import ChooseGender from "./ChooseGender";
import app from "./helper/base";
export default function Home() {
  const [userData, setUserData] = useState(null);
  const user = app.auth().currentUser;
  useEffect(async () => {
    await app
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((x) => {
        console.log(x.data());
        setUserData(x.data());
      });
  }, [user]);
  return (
    <>
      {userData ? (
        <AlreadyBooked data={{ ...userData, name: user.displayName }} />
      ) : (
        <ChooseGender />
      )}
    </>
  );
}
