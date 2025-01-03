import CommonForm from '@/common/form'

import { loginFormControls,  } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthRegister from './register';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { data } from 'autoprefixer';
import { toast } from '@/hooks/use-toast';

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();

  function onSubmit(event){
      event.preventDefault()
      dispatch(loginUser(formData)).then(data=>{
         if(data?.payload?.success){
           toast({
             title:data?.payload?.message
           })
         }  else {
              toast({
                 title:data?.payload?.message,
                 variant: "destructive",
              })
         }
      })

  } 

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to ypur account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;