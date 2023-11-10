export interface Club {
    organizationID: string;
    positionID: string;
    clubStarted: Date;
    clubEnded: Date;
}

// This includes both the award and seminars
export interface Award {
    awardAttendedName: string;
    awardName: string;
    awardReceived: Date;
}