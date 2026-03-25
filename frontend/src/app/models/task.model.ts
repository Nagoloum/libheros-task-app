export interface Task {
  _id: string;
  shortDescription: string;
  longDescription?: string;
  dueDate: string;
  isCompleted: boolean;
  listId: string;
  userId: string;
  createdAt?: Date;
}