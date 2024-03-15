import React from 'react';
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

function Category() {
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
        <CardContent>
          <div className="grid grid-cols-3 gap-[3rem]">
            <div className="">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                className="capitalize"
              />
            </div>

            <div className="flex flex-col gap-2 justify-end">
              <Button className="flex items-center gap-1">Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* all categories section  */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">All Categories (18)</h2>

        <div className="mt-10">
          <Card className="flex items-center pt-6">
            <CardContent className="flex w-full items-center justify-between">
              <div className="flex items-center gap-8">
                <div>category name</div>
              </div>

              <div className="flex items-center gap-8">
                <Button className="flex items-center gap-1">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Category;
