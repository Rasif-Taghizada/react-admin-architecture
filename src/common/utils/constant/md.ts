// data.ts
export type Bank = {
  id: string;
  name: string;
};

export type ShareUser = {
  id: string;
  fullName: string;
  email: string;
  bankId: string;
};

export const BANKS: Bank[] = [
  { id: "kapital", name: "Kapital Bank" },
  { id: "access", name: "AccessBank" },
  { id: "respublika", name: "Bank Respublika" },
  { id: "yelo", name: "Yelo Bank" },
  { id: "pasha", name: "Pasha Bank" },
];

export const USERS: ShareUser[] = [
  {
    id: "1",
    fullName: "Fatima Jafarova",
    email: "exampletest1@gmail.com",
    bankId: "kapital",
  },
  {
    id: "2",
    fullName: "Gunay Nasirova",
    email: "exampletest2@gmail.com",
    bankId: "kapital",
  },
  {
    id: "3",
    fullName: "Rashad Hasanov",
    email: "test1@gmail.com",
    bankId: "kapital",
  },
  {
    id: "4",
    fullName: "Leyla Ibrahimova",
    email: "testexampletest3@gmail.com",
    bankId: "kapital",
  },
  {
    id: "5",
    fullName: "Farid Ahmadov",
    email: "testtest@gmail.com",
    bankId: "kapital",
  },
];
