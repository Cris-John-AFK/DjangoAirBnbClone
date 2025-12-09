'use client';

import { resetAuthCookies } from '../lib/actions';

import MenuLink from "./navbar/MenuLink";

interface LogoutButtonProps {
    onClose?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClose }) => {
    const submitLogout = async () => {
        if (onClose) {
            onClose();
        }
        
        await resetAuthCookies();
        
        // Wait a moment for cookies to be cleared, then reload
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    }

    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;