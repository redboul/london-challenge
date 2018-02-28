export const AccountType = {
  participant: 1,
  admin: 2,
};

export interface User {
  id: string;
  uuid: string;
  accountType: number;
  email: string;
  teamName: string;
  logo: string;
}
