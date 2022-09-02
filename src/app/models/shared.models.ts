export class Audit {
    createdBy: string;
    createdOn: number;
    updatedBy: string;
    updatedOn: string;
    reiewedBy: string;
    reviewedOn: string;
    approvedBy: string;
    approvedOn: string;
}

export class PagedResult<T>{

    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    totalRows?: number;

    results?: T[];
}

export class ListItem {
    text: string;
    value: string;
}

export class ApiError {
    message: string;
    errors: {
        type: string;
        $values: ApiErrorDetails[];
    }
}

export class ApiErrorDetails {
    propertyName: string;
    errorMessage: string;
    errorCode: string;
}

