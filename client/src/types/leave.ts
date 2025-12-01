export type Leave = {
  id: number;
  date: string;
  reason: string;
  remarks?: string;
  user: { id: number; name: string };
};
