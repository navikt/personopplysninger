export type AuthInfo =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      name: string;
      securityLevel: string;
    };
