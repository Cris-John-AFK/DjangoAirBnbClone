'use client';
import Modal from "./Modal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
    const signupModal = useSignUpModal();
    
    const content = (
        <>
            <form className="space-y-4">
                <input placeholder="Your Email" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input placeholder="Your Password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input placeholder="Repeat Password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>

                    <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                       The Error Message
                    </div>
                
                <CustomButton
                    label="Submit"
                    onClick={() => console.log("Test")}
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