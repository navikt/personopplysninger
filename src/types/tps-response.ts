interface TPSErrorDetail {
  name: string;
  message: string;
}

interface TPSError {
  message: string;
  details?: TPSErrorDetail[];
}

export type TPSResponse =
  | {
      statusType: "OK";
    }
  | {
      statusType: "PENDING";
      error?: TPSError;
    }
  | {
      statusType: "ERROR";
      error?: TPSError;
    };
