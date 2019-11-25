export type AuthInfo =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      name: string;
      securityLevel: string;
    };

export interface AuthOidc {
  authenticated: true | false;
}
