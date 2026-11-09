export interface TableHeaders {
  id: string;
  text: string;
}

export interface TableRow {
  property: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface TableModelRow {
  name: string;
  values: string[];
}
