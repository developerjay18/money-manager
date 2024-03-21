import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import authservice from '@/appwrite/auth';
import { login } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import incomeService from '@/appwrite/income.config';

const groupIncomeByDate = (incomes) => {
  return incomes.reduce((groupedIncomes, income) => {
    const date = income.$createdAt.slice(0, 10);
    if (!groupedIncomes[date]) {
      groupedIncomes[date] = [];
    }

    groupedIncomes[date].push(income);
    return groupedIncomes;
  }, {});
};

function Income() {
  const [income, setIncome] = useState({
    name: '',
    amount: '',
  });
  const [allGroupedIncomes, setAllGroupedIncomes] = useState({});
  const [length, setLength] = useState(0);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authservice.getCurrentAccount();
        if (userData) {
          dispatch(login(userData));
          setUserId(userData.$id);
          console.log('USER LOGGED IN SUCCESSFULLY');
        }

        await incomeService.getAllIncomes([]).then((income) => {
          if (income) {
            const filteredIncomes = income.documents.filter(
              (inc) => inc.userId === userId
            );
            setLength(filteredIncomes.length);

            // filtering all incomes by date
            const groupedData = groupIncomeByDate(filteredIncomes);
            setAllGroupedIncomes(groupedData);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, userId, allGroupedIncomes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIncome((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await incomeService.addIncome(income.name, income.amount, userId);
      console.log('INCOME ADDED SUCCESSFULLY');
      setIncome({
        name: '',
        amount: '',
      });
    } catch (error) {
      console.log('ERROR ON ADDING INCOME ON FRONT-END', error);
    }
  };

  const handleDelete = (id) => {
    try {
      incomeService.deleteIncome(id);
      console.log('INCOME DELETED SUCCESSFULLY');
    } catch (error) {
      console.log('ERROR ON DELETEING INCOME ON FRONT-END', error);
    }
  };

  return (
    <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins">
      {/* add expense section  */}
      <Card>
        <CardHeader>
          <CardTitle>Add Income</CardTitle>
          <CardDescription>Add your Income in one single click</CardDescription>
        </CardHeader>
        <form action="" method="post" onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-[3rem]">
              <div className="">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="capitalize"
                  value={income.name}
                  onChange={handleChange}
                  required={true}
                />
              </div>

              <div className="">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  className="capitalize"
                  value={income.amount}
                  onChange={handleChange}
                  required={true}
                />
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <Button
                  type="submit"
                  className="flex items-center gap-1 mt-3 lg:mt-0 hover:bg-[#fd366e] hover:text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* all expenses section  */}
      {length ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">All Incomes ({length})</h2>

          <div className="mt-10 flex flex-col gap-y-6">
            {Object.keys(allGroupedIncomes).map((date) => (
              <div className="flex flex-col gap-y-4" key={date}>
                <div className="flex gap-x-3 items-center">
                  <i className="fa-solid fa-angles-right"></i>
                  <h2 className="text-lg font-semibold">Incomes on {date}</h2>
                </div>
                <hr />
                <ul className="flex flex-col gap-y-2">
                  {allGroupedIncomes[date].map((item) => (
                    <Card className="flex items-center pt-6" key={item.$id}>
                      <CardContent className="flex w-full items-center justify-between flex-col lg:flex-row gap-5 lg:gap-0">
                        <div className="flex items-center justify-between lg:justify-start gap-8 w-full">
                          <div className="lg:w-[30%]">{item.name}</div>
                          <div className="flex items-center gap-1">
                            {' '}
                            <span>&#8377;</span>
                            <span>{item.amount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="flex items-center border rounded-lg">
                            <input
                              type="text"
                              id="category"
                              value={'Cash Inflow'}
                              className="capitalize w-[80%] bg-transparent inline-flex p-2"
                              readOnly="true"
                            />
                            <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
                          </div>

                          <Button
                            className="flex items-center gap-1 hover:bg-[#fd366e] hover:text-white"
                            onClick={() => handleDelete(item.$id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center lg:min-h-screen">
          <div className="loader mx-auto"></div>
        </div>
      )}
    </div>
  );
}

export default Income;
