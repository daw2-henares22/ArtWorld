import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../bd/supaBase";
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();
  const { setSession } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  let navigate = useNavigate();
  const [dialogData, setDialogData] = useState({ email: '', password: '' });

  function handleChange(event) {
    setDialogData((prevDialogData) => ({
      ...prevDialogData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: dialogData.email,
        password: dialogData.password
      });
      if (error) throw error;
      setSession(data.session);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      if (error.message.includes('Invalid login credentials')) {
        alert('Wrong email or password');
      } else {
        alert('Error logging in');
      }
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>{t('Login')}</Button>
      <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
        <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4">Login</Typography>
              <Typography className="mb-3 font-normal text-gray-600 dark:text-gray-300" variant="paragraph">
                Enter your email and password to Login.
              </Typography>
              <Typography className="-mb-2" variant="h6">Your Email</Typography>
              <Input color="blue-gray" className="dark:text-gray-300" label="Email" size="lg" name="email" type="email" required onChange={handleChange} />
              <Typography className="-mb-2" variant="h6">Your Password</Typography>
              <Input color="blue-gray" className="dark:text-gray-300" label="Password" size="lg" name="password" type="password" required autoComplete="current-password" onChange={handleChange} />
              <div className="-ml-2.5 -mt-3 text-gray-600 dark:text-gray-300">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">Login</Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                Don&apos;t have an account?
                <Link to="/signUp" className="ml-1 font-bold text-blue-gray-900 dark:text-blue-gray-100">Sign up</Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
};