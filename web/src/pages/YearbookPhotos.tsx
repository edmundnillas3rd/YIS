import Container from "../components/Container";
import { Input } from "../components/Globals";
import Table from "../components/Table";

export default function () {

    const attr = [
        0
    ];

    const datas = [
        0
    ];

    const onClick = async (data: any) => {

    };

    return (
        <Container>
            <Input
                placeholder="Search the name of student"
            />
            <Table
                columns={attr}
                datas={datas}
                onClickCallback={onClick}
            />
        </Container>
    );
}