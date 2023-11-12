interface Student {
    course: string;
    name: string;
    soliNum: Number;
    careOf: string;
    returned: boolean;
    dateReturn: Date;
    yearbookHalfPaid: boolean;
    yearbookHalfPaidOR: string;
    fullyPaid: boolean;
    fullyPaidOr: string;
}

interface Label {
    id: string;
    name: string;
}

interface PopupModalProps {
    name?: string;
    data: any;
    onClickCallback: (event: SyntheticEvent) => void;
}