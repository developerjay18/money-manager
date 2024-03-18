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
import categoryService from '@/appwrite/category.config';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import authservice from '@/appwrite/auth';
import { useNavigate } from 'react-router-dom';

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [userId, setUserId] = useState('');
  const [allCategories, setAllCategories] = useState({});
  const [length, setLength] = useState(0);
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
            setLength(filteredCategories.length);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, categoryName, allCategories,userId]);
  // all categories are refreshing themselves continously

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryService.addCategory(categoryName, userId);
      setCategoryName('');
      console.log('CATEGORY ADDED SUCCESSFULLY');
    } catch (error) {
      console.log('ERROR OCCURED ON CATEGORY ADDITION AT FRONT-END');
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDelete = (id) => {
    categoryService.deleteCategory(id);
    console.log('CATEGORY DELETED SUCCESSFULLY');
  };

  return (
    <div className="px-[4rem] pt-10 py-[1rem] font-poppins">
      {/* add category section  */}
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>
            Add your category in one single click
          </CardDescription>
        </CardHeader>
        <form action="#" method="post" onSubmit={handleSubmit}>
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
                  value={categoryName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <Button type="submit" className="flex items-center gap-1">
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* all categories section  */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">All Categories ({length})</h2>

        <div className="mt-10">
          {length && (
            <div className="flex flex-col gap-y-3">
              {allCategories.map((item, index) => (
                <Card className="flex items-center pt-6" key={index}>
                  <CardContent className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div>{item.name}</div>
                    </div>

                    <div className="flex items-center gap-8">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
