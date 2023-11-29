export async function searchStudents(fullName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users/student-search`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName })
        })
            .then(response => response.json())
            .then(data => {
                resolve(data.results);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export async function searchStudentPaid(fullName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users/student-search-paid`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName })
        })
            .then(response => response.json())
            .then(data => {
                resolve(data.results);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export async function searchStudentRecipient(fullName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users/student-search-recipient`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName })
        })
            .then(response => response.json())
            .then(data => {
                resolve(data.results);
            })
            .catch((err) => {
                reject(err);
            });
    });
}