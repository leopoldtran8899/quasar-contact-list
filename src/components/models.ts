// export interface Role {
//   id: number;
//   name: string;
//   company_id: number;
//   group_id: number;
//   staff_id: number;
// }
export interface User {
  id:                number;
  email:             string;
  email_verified_at: Date;
  role_id:           number;
  created_at:        Date;
  updated_at:        Date;
  contact:           Contact;
}


export interface Contact {
  id: number;
  // status: string;
  first_name: string;
  last_name: string;
  company: Company | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  // company_id: number | null;
  emergency_name: string | null;  
  emergency_phone: string | null;
  // supervisor_id: number | null;
  supervisor: User | null;
}


export interface Main {
  notes: Note[];
}

export interface Note {
  id:         number;
  created_at: string;
  updated_at: string;
  contact_id: number;
  creator_id: number;
  note:       string;
  creator:    User;
}


export type Group = {
  id: number;
  name: string;
  companies: Company[] | null;
};
// FIXME: Update type
export type Company = {
  id: number;
  name: string;
  group_id: number;
  group: Group | null;
};
