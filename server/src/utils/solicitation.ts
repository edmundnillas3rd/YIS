// TODO: might have to remove this function along with the student name parser
export async function parseSoliNum(soli: string | string[]): Promise<string | string[]> {

    let s: string | string[] = "";

    if (typeof soli === "string") {
        s = (soli as unknown as string).split("EXCEPT: ");

        if (s.length === 2) {
            if (s.includes("&")) {
                const soliNums = s[1].split("&");

                return soliNums;
            } else if (s.includes("-")) {
                const soliNums = s[1].split("-");
                return soliNums;
            }

            return s[1];
        }
    }


    return soli;
}