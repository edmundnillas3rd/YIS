export interface Club {
    organizationName: string;
    positionName: string;
    clubStarted: Date;
    clubEnded: Date;
}

// This includes both the award and seminars
export interface Award {
    awardAttendedName: string;
    awardName: string;
    awardReceived: Date;
}