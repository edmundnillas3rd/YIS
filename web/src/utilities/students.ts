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


export async function searchStudentYearbookStatus(fullName: string): Promise<any> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/search-yearbook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: fullName
            })
        });

        const { searchResults, error } = await response.json();

        if (error) {
            
            return;
        }

        return searchResults;
    } catch (err) {
        console.error(err);
    }
}

export async function searchStudentYearbookPhotoStatus(fullName: string): Promise<any> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/search-yearbook-photo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: fullName
            })
        });

        const { searchResults, error } = await response.json();

        if (error) {
            
            return;
        }

        return searchResults;
    } catch (err) {
        console.error(err);
    }
}

export async function searchStudentSolicitationStatus(fullName: string, course: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/search-solicitation-form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: fullName,
                course: course
            })
        });

        const { searchResults, error } = await response.json();
        if (error) {
            
            return;
        }

        return searchResults;
    } catch (error) {
        

    }
}