
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../bd/supaBase";


export function SignUp(){
    const[open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    
    const [dialogData,setDialogData] = useState({
      fullName:'',email:'',password:''
    })

    function handleChange(event){
      setDialogData((prevDialogData)=>{
        return{
          ...prevDialogData,
          [event.target.name]:event.target.value
        }
      })
    }

    async function handleSubmit(e){
      e.preventDefault()
      try {
        let { data, error } = await supabase.auth.signUp({
          email: dialogData.email,
          password: dialogData.password,
          options:{
            data:{
              full_name: dialogData.fullName
            }
          }
        })
        alert('Check your email for veification link')
        
      } catch (error) {
        alert(error);  
      }
    }

    return(
    <>
       <Button onClick={handleOpen}>Sign up</Button>
      <Dialog
        onSubmit={handleSubmit}
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign up
            </Typography>
            <Typography
              className="mb-3 font-normal"
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
              name="fullName"
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input 
              label="Email@gmail.com" 
              size="lg"
              name="email"
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input 
              label="Password" 
              size="lg"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button 
              variant="gradient" 
              onClick={handleOpen} 
              fullWidth
              type="submit"
            >
              Sign Up
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                <Link to="/login">Login</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}