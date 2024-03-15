import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Home() {
  return (
    <div className="px-[4rem] pt-10 py-[1rem]">
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
            <CardTitle>Total categories</CardTitle>
            <CardDescription>
              Categories created by you till now from 15-03-2024
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

        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Most Expensive Category</CardTitle>
            <CardDescription>
              This Category Cosumes highest expenses
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
      </div>
    </div>
  );
}

export default Home;
