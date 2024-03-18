import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { Link, useNavigate } from 'react-router-dom';
import authservice from '@/appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

const message =
  'Hello, I came from your webiste and I want Website for my Business.';
const whatsappUrl =
  'https://wa.me/' + '+916351468706' + '?text=' + encodeURIComponent(message);

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    await authservice.logoutAccount();
    navigate('/auth');
  };

  return (
    <nav>
      <div className="grid grid-flow-col px-[4rem] py-[1rem] grid-cols-2 items-center font-poppins">
        <div className="font-bold text-xl">MONEY MANAGER</div>
        <div className="">
          {' '}
          <Menubar>
            <MenubarMenu>
              <Link to={'/'}>
                <MenubarTrigger>Home</MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link to={'/expenses'}>
                <MenubarTrigger>Expenses</MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link to={'/category'}>
                <MenubarTrigger>category</MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Contact Us</MenubarTrigger>
              <MenubarContent className="font-poppins">
                <Link to={'/feedback'}>
                  <MenubarItem>Feedback</MenubarItem>
                </Link>
                <Link to={'https://www.jayraiweb.com'}>
                  <MenubarItem>Meet Developer</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link to={whatsappUrl}>
                  <MenubarItem>Whatsapp Us</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger onClick={handleLogout}>Logout</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
