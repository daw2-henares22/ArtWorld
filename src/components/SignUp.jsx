import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../bd/supaBase";

export function SignUp(){
    const[open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    
    const [dialogData,setDialogData] = useState({
      name:'', email:'', password:''
    });


    async function handleSubmit(e){
      e.preventDefault();
      try {
        let { data, error } = await supabase.auth.signUp({
          email: dialogData.email,
          password: dialogData.password,
          options: {
            data: {
              name: dialogData.name
            }
          }
        });
        if (error) throw error;
        alert('Check your email for verification link');
      } catch (error) {
        alert(error.message);  
      }
    }

    function handleChange(event){
      setDialogData((prevDialogData)=>{
        return{
          ...prevDialogData,
          [event.target.name]: event.target.value
        }
      });
    }

    return(
    <>
      <Button onClick={handleOpen}>Sign up</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="dark:text-white text-blue-gray-900 mx-auto w-full max-w-[24rem]">
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4">
                Sign up
              </Typography>
              <Typography
                className="mb-3 font-normal text-gray-600 dark:text-gray-300"
                variant="paragraph"
                color="gray"
              >
                Enter your email and password to Sign Up.
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Name
              </Typography>
              <Input 
                label="Name"
                size="lg"
                name="name"
                type="text"
                required
                onChange={handleChange}
              />
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input
                className="text-gray-600 dark:text-gray-300"
                label="Email@gmail.com" 
                size="lg"
                name="email"
                type="email"
                required
                onChange={handleChange}
              />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input
                className="text-gray-600 dark:text-gray-300"
                label="Password" 
                size="lg"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                onChange={handleChange}
              />
              <div className="-ml-2.5 -mt-3 text-gray-600 dark:text-gray-300">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button 
                variant="gradient"
                fullWidth
                type="submit"
              >
                Sign Up
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                Have an account?
                <Link to="/login" className="ml-1 font-bold text-blue-gray-900 dark:text-blue-gray-100">
                  Login
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
    );
}