interface ValidationDetail {
  name: string;
  message: string;
}

interface ValidationError {
  message: string;
  details?: ValidationDetail[];
}

export type TPSResponse =
  | {
      statusType: "OK";
    }
  | {
      statusType: "PENDING";
    }
  | {
      statusType: "ERROR";
      validationError: ValidationError;
    };
