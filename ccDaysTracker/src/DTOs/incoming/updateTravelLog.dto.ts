export interface UpdateTravelLogDto {
    TripUniqueId: string;

    IsPermanentResident: boolean;

    ArrivedInCanadaOn: string;

    DepartedCanadaOn: string | undefined;

    Destination: string | undefined;

    ReasonForTravel: string | undefined;
}