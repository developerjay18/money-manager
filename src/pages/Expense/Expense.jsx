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
import expenseService from '@/appwrite/expense.config';
import categoryService from '@/appwrite/category.config';

const groupExpenseByDate = (expenses) => {
  return expenses.reduce((groupedExpenses, expense) => {
    const date = expense.$createdAt.slice(0, 10);
    if (!groupedExpenses[date]) {
      groupedExpenses[date] = [];
    }

    groupedExpenses[date].push(expense);
    return groupedExpenses;
  }, {});
};

function Expense() {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
  });
  const [allGroupedExpenses, setAllGroupedExpenses] = useState({});
  const [length, setLength] = useState(0);
  const [userId, setUserId] = useState('');
  const [allCategories, setAllCategories] = useState({});
  const [catLength, setCatLength] = useState(0);
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

        await categoryService.getAllCategory([]).then((cats) => {
          if (cats) {
            const filteredCategories = cats.documents.filter(
              (category) => category.userId === userId
            );
            setAllCategories(filteredCategories);
            setCatLength(filteredCategories.length);
          }
        });

        await expenseService.getAllExpenses([]).then((expense) => {
          if (expense) {
            const filteredExpenses = expense.documents.filter(
              (exp) => exp.userId === userId
            );
            setLength(filteredExpenses.length);
            const groupedData = groupExpenseByDate(filteredExpenses);
            setAllGroupedExpenses(groupedData);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, userId, allGroupedExpenses]);
  // all categories are refreshing themselves continously

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await expenseService.addExpense(
        expense.category,
        expense.name,
        expense.amount,
        userId
      );
      console.log('EXPENSE ADDED SUCCESSFULLY');
      setExpense({
        name: '',
        amount: '',
        category: '',
      });
    } catch (error) {
      console.log('ERROR ON ADDING EXPENSE ON FRONT-END', error);
    }
  };

  const handleDelete = (id) => {
    try {
      expenseService.deleteExpense(id);
      console.log('EXPENSE DELETED SUCCESSFULLY');
    } catch (error) {
      console.log('ERROR ON DELETEING EXPENSE ON FRONT-END', error);
    }
  };

  return (
    <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins">
      {/* add expense section  */}
      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription>
            Add your expense in one single click
          </CardDescription>
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
                  value={expense.name}
                  onChange={handleChange}
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
                  value={expense.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>

                <div className="min-h-[5vh] lg:min-h-[7vh] w-full ">
                  {catLength ? (
                    <select
                      name="category"
                      id="category"
                      value={expense.category.$id}
                      onChange={handleChange}
                      className="bg-transparent p-1 border border-slate-700 rounded-md w-full h-full"
                    >
                      <option value="none" className="bg-black rounded-lg">
                        Select category
                      </option>
                      {allCategories.map((item, index) => (
                        <option
                          value={item.$id}
                          className="bg-black rounded-lg"
                          key={index}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h1>Loading...</h1>
                  )}
                </div>

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
          <h2 className="text-xl font-semibold">All Expenses ({length})</h2>

          <div className="mt-10 flex flex-col gap-y-6">
            {Object.keys(allGroupedExpenses).map((date) => (
              <div className="flex flex-col gap-y-4" key={date}>
                <div className="flex gap-x-3 items-center">
                  <i className="fa-solid fa-angles-right"></i>
                  <h2 className="text-lg font-semibold">Expenses on {date}</h2>
                </div>
                <hr />
                <ul className="flex flex-col gap-y-2">
                  {allGroupedExpenses[date].map((item) => (
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
                          <Input
                            type="text"
                            id="categorys"
                            value={item.category?.name}
                            className="capitalize"
                            readOnly="true"
                            clickable="false"
                          />

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

export default Expense;
