import { useEffect, useState } from "react";
import { Dropdown, Input, Modal } from "../Globals";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2
}: ModalProps) {

    const [soli, setSoli] = useState();
    const [statuses, setStatuses] = useState();

    const [status, setStatus] = useState();

    useEffect(() => {
        if (data && data2) {
            setSoli(data);
            setStatuses(data2);


            const filteredStatus = data2.filter((s: any) => {
                console.log(data['returnedStatus'] === s['name']);

                return data['returnedStatus'] === s['name'];
            });
            console.log(filteredStatus);

            setStatus(filteredStatus);
            // console.log(data2, data['returnedStatus']);

        }
    }, [data, data2]);

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
            data={data}
        >
            {soli && status && (
                <section className="flex flex-col gap-2">
                    <h3 className="font-bold">{soli['fullName']}<br/>SOLI FORM # {soli['soliNumber']}</h3>
                    <Dropdown
                        label="STATUS"
                        name="status"
                        defaultValue={status[0]['id']}
                        datas={statuses}
                        disabled={true}
                    />
                    <Input
                        title="DATE RETURNED"
                        id="dateReturned"
                        defaultValue={soli['dateReturned']}
                        disabled={true}
                    />
                     <Input
                        title="OR NUMBER"
                        id="ornumber"
                        defaultValue={soli['ORnumber']}
                        disabled={true}
                    />
                     <Input
                        title="PAYMENT STATUS"
                        id="paymentStatus"
                        defaultValue={soli['paymentStatus']}
                        disabled={true}
                    />
                </section>
            )}
        </Modal>
    );
}