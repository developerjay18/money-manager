import React from 'react';
import authservice from '@/appwrite/auth';

function Auths() {
  const loginWithGoogleAuth = async (e) => {
    e.preventDefault();
    await authservice.loginWithGoogle();
  };

  return (
    <div className="px-[4rem] pt-10 py-[1rem] flex justify-center font-poppins">
      <button
        onClick={loginWithGoogleAuth}
        className="bg-red-500 px-5 py-3 rounded-lg capitalize text-lg flex gap-3"
      >
        <span>Login with google</span>
        <span>
          <i className="fa-brands fa-google"></i>
        </span>
      </button>
    </div>
  );
}

export default Auths;
