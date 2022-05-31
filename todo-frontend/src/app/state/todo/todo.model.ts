export interface Todo {
  id: string;
  title: string;
  note: string;
  status: string;
  is_deleted: boolean;
  created_at: Date;
  completed_at: Date;
}

export interface Todos {
  content: Todo[]
}