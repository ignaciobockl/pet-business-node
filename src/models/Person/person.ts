export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  cuilCuit: string;
  cellPhone?: string;
  // address
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
