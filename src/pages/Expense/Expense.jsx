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

function Expense() {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
  });
  const [allExpenses, setallExpenses] = useState({});
  const [length, setLength] = useState(0);
  const [allCategories, setAllCategories] = useState({});
  const [catLength, setCatLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const userData = authservice.getCurrentAccount();
        if (userData) {
          dispatch(login(userData));
          console.log('USER LOGGED IN SUCCESSFULLY');
        }

        categoryService.getAllCategory([]).then((cats) => {
          if (cats) {
            setAllCategories(cats.documents);
            setCatLength(cats.total);
          }
        });

        expenseService.getAllExpenses([]).then((expense) => {
          if (expense) {
            setallExpenses(expense.documents);
            setLength(expense.total);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, allExpenses]);
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
      const exp = await expenseService.addExpense(
        expense.category,
        expense.name,
        expense.amount
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
    <div className="px-[4rem] pt-10 py-[1rem] font-poppins">
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
            <div className="grid grid-cols-3 gap-[3rem]">
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

                {catLength && (
                  <select
                    name="category"
                    id="category"
                    value={expense.category.$id}
                    onChange={handleChange}
                    className="bg-transparent p-1 border border-slate-700 rounded-md"
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
                )}

                <Button type="submit" className="flex items-center gap-1">
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* all expenses section  */}
      {length && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">All Expenses ({length})</h2>

          <div className="mt-10 flex flex-col gap-3">
            {allExpenses.map((item, index) => (
              <Card className="flex items-center pt-6" key={index}>
                <CardContent className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-8 w-full">
                    <div className="w-[30%]">{item.name}</div>
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
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(item.$id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Expense;
