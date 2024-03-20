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

const groupCategoryByDate = (categories) => {
  return categories.reduce((groupedCategories, category) => {
    const date = category.$createdAt.slice(0, 10);
    if (!groupedCategories[date]) {
      groupedCategories[date] = [];
    }

    groupedCategories[date].push(category);
    return groupedCategories;
  }, {});
};

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [userId, setUserId] = useState('');
  const [allGroupedCategories, setAllGroupedCategories] = useState({});
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
            setLength(filteredCategories.length);
            const groupedData = groupCategoryByDate(filteredCategories);
            setAllGroupedCategories(groupedData);
          }
        });
      } catch (error) {
        console.log('USER IS NOT LOGGED IN', error);
        navigate('/auth');
      }
    };

    fetchUser();
  }, [dispatch, navigate, categoryName, userId]);
  // also add allGroupedcategories
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
    <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins">
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
            <div className="grid lg:grid-cols-3 lg:gap-[3rem]">
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

              <div className="flex flex-col gap-2 justify-end mt-3 lg:mt-0">
                <Button
                  type="submit"
                  className="flex items-center gap-1 hover:bg-[#fd366e] hover:text-white"
                >
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
          {length ? (
            <div className="flex flex-col gap-y-3">
              {Object.keys(allGroupedCategories).map((date) => (
                <div className="flex flex-col gap-y-4" key={date}>
                  <div className="flex gap-x-3 items-center">
                    <i className="fa-solid fa-angles-right"></i>
                    <h2 className="text-lg font-semibold">
                      Categories on {date}
                    </h2>
                  </div>
                  <hr />
                  <ul className="flex flex-col gap-y-2">
                    {allGroupedCategories[date].map((item) => (
                      <Card className="flex items-center pt-6" key={item.$id}>
                        <CardContent className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-8">
                            <div>{item.name}</div>
                          </div>

                          <div className="flex items-center gap-8">
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
          ) : (
            <div className="mt-10 text-center lg:min-h-screen">
              <div className="loader mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
