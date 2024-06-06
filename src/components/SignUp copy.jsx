
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../bd/supaBase";


export function SignUp(){
    const[open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    
    const [formData, setFormData] = useState({
      email:'',name:'', password:''
    })
  
    async function handleSubmit(e){
  
      e.preventDefault()
  
      try {
        let { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data:{
              name: formData.name
            }
          }
        })
        alert('Check your email for verification link')
  
      } catch (error) {
        alert(error)
      }
    }
  
    function handleChange(event){
      setFormData((prevFormData)=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
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
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 font-semibold dark:font-bold dark:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6">
                User Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  name="name"
                  type="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 font-semibold dark:font-bold dark:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 font-semibold dark:font-bold dark:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex text-center">
            <button
                type="submit"
                className="w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-indigo-600 dark:bg-gray-600 rounded-md shadow-sm hover:bg-indigo-500 dark:hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <Link to="/login" className="w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-indigo-600 dark:bg-gray-600 rounded-md shadow-sm hover:bg-indigo-500 dark:hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <button>
                  Login
                </button>
              </Link>
            </div>
          </form>
      </Dialog>
    </>
  );
}