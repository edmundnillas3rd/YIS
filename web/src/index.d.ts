interface User {
    firstName: stringstring;
    familyName: string;
    middleName: string;
    role: string;
    suffix: string;
    claimStatus?: string;
}

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    data?: any;
    data2?: any;
};


interface Student {
    firstName: String;
    familyName: String;
    middleName: String;
    suffix: String;
    course: String;
}