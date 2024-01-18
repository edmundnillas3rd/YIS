export async function parseStudentName(name: string): Promise<Student> {
    let parseName: Student = {
        firstName: "",
        familyName: "",
        middleName: ""
    };

    let splitName = name.split(",");

    const familyName = splitName[0];
    const splitFirstName = splitName[1]?.split(" ");
    splitFirstName?.shift();

    if (typeof splitFirstName === "undefined") {
        return parseName;
    }

    parseName = {
        firstName: splitFirstName[0],
        familyName: familyName,
        middleName: splitFirstName[1]
    }

    return parseName;
}