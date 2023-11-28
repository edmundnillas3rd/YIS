import { SyntheticEvent, useContext } from "react";
import Input from "../components/globals/Input";
import Container from "../components/Container";
import { AuthContext } from "../context/AuthProvider";
import Button from "../components/globals/Button";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);

    if (currentUser) console.log(currentUser);


    const onInputChangeHandler = (event: SyntheticEvent) => {
    };

    const onSubmitHandler = (event: SyntheticEvent) => {

    };

    return (
        <Container>
            <section>
                <h3 className="font-bold mb-5">Student Information</h3>
            </section>
            {currentUser && (
                <form
                    className="flex flex-row gap-2"
                    method="POST"
                    onSubmit={onSubmitHandler}>
                    <Input
                        title="FAMILY NAME"
                        id="family-name"
                        onChange={onInputChangeHandler}
                        value={currentUser['familyName']}
                    />
                    <Input
                        title="FIRST NAME"
                        id="first-name"
                        onChange={onInputChangeHandler}
                        value={currentUser['firstName']}
                    />
                    <Input
                        title="MIDDLE NAME"
                        id="middle-name"
                        onChange={onInputChangeHandler}
                        value={currentUser['middleName']}
                    />
                    <Input
                        title="SUFFIX"
                        id="suffix"
                        onChange={onInputChangeHandler}
                        value={currentUser['suffix']}
                    />
                </form>
            )}
        </Container>
    );
}