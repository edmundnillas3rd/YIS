export async function getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users/user-current`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                const { userData } = data;
                if (userData) {
                    resolve(userData);
                } else {
                    reject("No currently login user")
                }
            });
    });
}