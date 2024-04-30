export interface ITimestamp {
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthorTimestamp extends ITimestamp {
    createdBy: string | null;
    updatedBy: string | null;
}
