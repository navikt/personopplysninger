interface TPSErrorDetail {
    [key: string]: string[];
}

interface TPSError {
    message: string;
    details?: TPSErrorDetail;
}

export type TPSResponse =
    | {
          statusType: 'OK';
      }
    | {
          statusType: 'PENDING';
          error?: TPSError;
      }
    | {
          statusType: 'ERROR';
          error?: TPSError;
      };
