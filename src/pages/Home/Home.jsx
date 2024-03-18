import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import authservice from '@/appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import categoryService from '@/appwrite/category.config';
import { addCategories } from '@/store/categorySlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authservice.getCurrentAccount();
        if (userData) {
          dispatch(login(userData));
          console.log('USER LOGGED IN SUCCESSFULLY');
        }

        // const categoriesData = await categoryService.getAllCategory();
        // if (categoriesData) {
        //   dispatch(addCategories(categoriesData));
        //   console.log('CATEGORIES FETCHED AND STORED SUCCESSFULLY');
        // }
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return (
    <div className="px-[4rem] pt-10 py-[1rem]">
      <div className="font-poppins text-7xl capitalize text-center pt-10 pb-20 font-semibold">
        Welcome to Money Manager
      </div>

      <div className="flex justify-center lg:gap-x-10 flex-wrap gap-y-4 lg:gap-y-10 flex-col lg:flex-row font-poppins">
        <Card className="lg:w-[30%]">
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>
              Expenses done by you till now from 15-03-2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="flex items-center gap-1 text-xl">
              <span>&#8377;</span>
              <span>
                <p className="text-lg">40000</p>
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Most Expensive Category</CardTitle>
            <CardDescription>
              This Category Cosumes highest expenses in your list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="flex items-center gap-1 text-xl">
              <span>&#8377;</span>
              <span>
                <p className="text-lg">140000</p>
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Today's Expenses</CardTitle>
            <CardDescription>
              Expenses done by you till now from 15-03-2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="flex items-center gap-1 text-xl">
              <span>&#8377;</span>
              <span>
                <p className="text-lg">40000</p>
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
