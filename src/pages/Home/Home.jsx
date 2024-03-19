import React, { useEffect, useState } from 'react';
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
import expenseService from '@/appwrite/expense.config';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [sum, setSum] = useState(0);
  const [todaysSum, setTodaysSum] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authservice.getCurrentAccount();
        if (userData) {
          dispatch(login(userData));
          setUserId(userData.$id);
          console.log('USER LOGGED IN SUCCESSFULLY');
        }

        await expenseService.getAllExpenses([]).then((expense) => {
          let localSum = 0;
          let localTodaysSum = 0;
          if (expense) {
            const filteredExpense = expense.documents.filter(
              (expense) => expense.userId === userId
            );

            let date = new Date();

            filteredExpense.map((exp) => {
              localSum += Number(exp.amount);

              let expenseDate = exp.$createdAt.slice(0, 10);
              let currentDate = date.toISOString().slice(0, 10);
              if (expenseDate === currentDate) {
                localTodaysSum += Number(exp.amount);
              }
            });

            setSum(localSum);
            setTodaysSum(localTodaysSum);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, userId]);

  return (
    <div className="lg:px-[4rem] px-5 pt-10 py-[1rem]">
      <div className="font-poppins text-4xl lg:text-7xl capitalize text-center pt-10 pb-10 lg:pb-20 font-semibold leading-[3rem]">
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
                <p className="text-lg">{sum}</p>
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:w-[30%]">
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

        <Card className="lg:w-[30%]">
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
                <p className="text-lg">{todaysSum}</p>
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
