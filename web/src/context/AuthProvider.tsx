import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utilities/user";

type IAuthContext = [undefined, React.Dispatch<React.SetStateAction<undefined>>];
export const AuthContext = createContext<IAuthContext>([[] as any, () => null]);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const response = await getCurrentUser();

            const [data] = await Promise.all([response]);
            console.log(data);
            setCurrentUser(data as any);

            if (data) {
                navigate("/home");
            } else {
                navigate("/");
            }
        })();
    }, []);


    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    );
};