import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../bd/supaBase";
import { useTranslation } from "react-i18next";

export function SignUp() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    
    const [dialogData, setDialogData] = useState({
        name: '', email: '', password: ''
    });

    async function handleSubmit(e) {
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
    
            // console.log('User data:', data.user);

            const uid = data.user.id;
    
            const role = data.user.email === 'henareshidalgoruben@fpllefia.com' ? 'admin' : 'user';
            let { error: profileError } = await supabase.from('Profiles').insert([
                {
                    uid: uid,
                    email: data.user.email,
                    name_user: dialogData.name,
                    role: role,
                    created_at: new Date()
                }
            ]);
            if (profileError) throw profileError;
    
            alert('Register successfully');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }

    function handleChange(event) {
        setDialogData((prevDialogData) => ({
            ...prevDialogData,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <>
            <Button onClick={handleOpen}>{t('Sign up')}</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4">
                                Sign up
                            </Typography>
                            <Typography
                                className="mb-3 font-normal dark:text-gray-300"
                                variant="paragraph"
                            >
                                Enter the credentials to SignUp.
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
                                color="blue-gray"
                                className="dark:text-gray-300"
                            />
                            <Typography className="-mb-2" variant="h6">
                                Your Email
                            </Typography>
                            <Input
                                label="Email@gmail.com" 
                                size="lg"
                                name="email"
                                type="email"
                                required
                                onChange={handleChange}
                                color="blue-gray"
                                className="dark:text-gray-300"
                            />
                            <Typography className="-mb-2" variant="h6">
                                Your Password
                            </Typography>
                            <Input
                                label="Password" 
                                size="lg"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                onChange={handleChange}
                                color="blue-gray"
                                className="dark:text-gray-300"
                            />
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