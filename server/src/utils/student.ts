export async function parseStudentName(name: string): Promise<Student> {
    let parseName: Student = {
        firstName: "",
        familyName: "",
        middleName: ""
    };

    let splitName = name.split(/,\s?/);

    console.log(splitName);
    

    const familyName = splitName[0];
    let splitFirstName: any;

    if (splitName[1]?.includes(' ')) {
        splitFirstName = splitName[1].split(" ");
    } else {
        splitFirstName = splitName[1];
    }

    console.log(splitFirstName);

    if (typeof splitFirstName === "undefined") {
        return parseName;
    }

    parseName = {
        firstName: typeof splitFirstName === "string" ? splitFirstName : splitFirstName[0],
        familyName: familyName,
        middleName: typeof splitFirstName === "string" ? splitFirstName : splitFirstName[1]
    }

    return parseName;
}