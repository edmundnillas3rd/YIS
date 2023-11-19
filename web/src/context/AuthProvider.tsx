import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type IAuthContext = [undefined, React.Dispatch<React.SetStateAction<undefined>>];
export const AuthContext = createContext<IAuthContext>([[] as any, () => null]);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users/user-current`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                const { userData } = data;
                if (userData) {
                    setCurrentUser(userData);
                } else {
                    navigate("/");
                }
            });
    }, []);


    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    );
};