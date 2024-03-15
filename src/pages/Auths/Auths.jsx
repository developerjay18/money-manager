import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Auths() {
  return (
    <div className="px-[4rem] pt-10 py-[1rem] flex justify-center font-poppins">
      <Tabs defaultValue="signup" className="w-[80%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                create your free account and manage your expenses
              </CardDescription>
            </CardHeader>
            <form action="#" method="POST">
              <CardContent className="space-y-2">
                <div className="gap-4 grid lg:grid-cols-2">
                  <div className="">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name" />
                  </div>
                  <div className="">
                    <Label htmlFor="email">email</Label>
                    <Input id="email" placeholder="Email" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="Password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="capitalize">create Account</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login here and get access to your home page
              </CardDescription>
            </CardHeader>
            <form action="" method="post">
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auths;
