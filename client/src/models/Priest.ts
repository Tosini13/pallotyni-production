import { Id } from "./Global";

export type TPriest = {
  id: Id;
  firstName: string;
  lastName: string;
  description?: string;
  path?: string;
  position?: string;
  isInFooter: boolean;
};

export type TCreatePriestAndImage = Omit<TPriest, "id" | "path"> & {
  imageFile: any;
};

export type TCreatePriest = Omit<TPriest, "id">;

export type TPriestUpdate = TPriest & {
  imageFile?: any;
};

export type TPriestCreateApiParams = Omit<TPriest, "id">;
