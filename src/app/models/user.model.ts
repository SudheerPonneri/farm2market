export type Role = 'farmer' | 'consumer';

export interface User {
  id: string;
  username: string;
  role: Role;
}