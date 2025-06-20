"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { context } from "../components/Clients";
import "./Profile.scss";

const Profile = () => {
  const router = useRouter();
  const { user, isLogin } = useContext(context);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (!isLogin) {
      router.push('/login');
    }
  }, [user]);
  if (!user) return null;
  return (
    <div className="user-profile">
      <div className="profile-card">
        <div className="avatar">{user.name?.[0].toUpperCase()}</div>
        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>
        <div className="info">
          <span>ID</span>
          <p>{user._id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
