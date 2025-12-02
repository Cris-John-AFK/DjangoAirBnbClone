// app/components/navbar/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null; // For server-side rendering
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const part = parts.pop();
        return part?.split(';').shift() || null;
    }
    return null;
};

const Navbar = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Check for userId in cookies on client-side
        const checkUserId = () => {
            const id = getCookie('session_userid');
            setUserId(id);
        };

        // Check immediately on mount
        checkUserId();
        
        // Listen for storage events to update the UI when login/logout happens in other tabs
        window.addEventListener('storage', checkUserId);
        
        // Also listen for visibility changes to check cookies when page becomes visible
        document.addEventListener('visibilitychange', checkUserId);
        
        // Check periodically in case cookies change
        const interval = setInterval(checkUserId, 500);

        return () => {
            window.removeEventListener('storage', checkUserId);
            document.removeEventListener('visibilitychange', checkUserId);
            clearInterval(interval);
        };
    }, []);

    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="DjangoBnb Logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilters />
                    </div>
                    <div className="flex items-center space-x-6">
                        <AddPropertyButton 
                            userId={userId}
                        />
                        <UserNav 
                            userId={userId}
                        />
                    </div>  
                </div>
            </div>
        </nav>
    );
};

export default Navbar;