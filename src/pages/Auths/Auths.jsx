import React from 'react';
import authservice from '@/appwrite/auth';

function Auths() {
  const loginWithGoogleAuth = async (e) => {
    e.preventDefault();
    await authservice.loginWithGoogle();
  };

  return (
    <div className="px-[4rem] pt-10 py-[1rem] flex flex-col justify-center font-poppins">
    <h1 className='text-7xl font-semibold text-center py-20 leading-[5.3rem]'>Get your Free Account <br /> and Track your Expense</h1>
      <button
        onClick={loginWithGoogleAuth}
        className="bg-red-500 px-5 py-3 rounded-lg capitalize text-lg flex gap-3 hover:bg-red-700 mx-auto lg:w-[20%]"
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
