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

interface User {
    firstName: string;
    familyName: string;
    middleName: string;
    suffix: string;
    role: string;
    claimStatus: string;
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

interface ClubAttr {
    positions: Label[],
    organizations: Label[];
}

interface Position {
    club_position_id: string;
    club_position_name: string;
}

interface Organization {
    club_organization_id: string;
    club_organization_name: string;
}
