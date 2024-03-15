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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

function Expense() {
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

            <div className="">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="text"
                id="amount"
                placeholder="Amount"
                className="capitalize"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Category</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="font-poppins">
                  <SelectItem value="category1">category 1</SelectItem>
                  <SelectItem value="category2">category 2</SelectItem>
                  <SelectItem value="category3">category 3</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-1">Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* all expenses section  */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">All Expenses (120)</h2>

        <div className="mt-10">
          <Card className="flex items-center pt-6">
            <CardContent className="flex w-full items-center justify-between">
              <div className="flex items-center gap-8">
                <div>Exp name</div>
                <div className="flex items-center gap-1">
                  {' '}
                  <span>&#8377;</span>
                  <span>Amount</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <Input
                  type="text"
                  id="category"
                  value="category"
                  className="capitalize"
                  readOnly="true"
                  clickable="false"
                />

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

export default Expense;
