'use client';
import Modal from "./Modal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignUpModal();

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    
    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: password1,
            password2: password2
        }
        try {
            const response = await apiService.postWithoutToken('/api/auth/register/', formData);
            if(response.access){
                await handleLogin(response.user.pk, response.access, response.refresh);

                signupModal.close();
                router.refresh();
            } else{
                const tmpErrors: string[] = Object.values(response).map((error: any)=>{
                    if (Array.isArray(error)) {
                        return error[0];
                    }
                    return error;
                })
                setErrors(tmpErrors);
            }
        } catch (error) {
            setErrors(['An error occurred. Please try again.']);
        }
    }

    const content = (
        <>
            <form 
                action={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your Password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat Password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                
                {errors.map((error, index) => {
                    return (
                        <div 
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}
                
                <CustomButton
                    label="Submit"
                    onClick={submitSignup }
                />
            </form>
        </>
    )
    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign Up"
            content={content}
            
        />
    )
}

export default SignupModal;