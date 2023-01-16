export const TaskCategories = ['house', 'bureaucracy'];

export enum Filter {
  done = 'done',
  ongoing = 'ongoing',
  house = 'house',
  bureaucracy = 'bureaucracy',
  all = 'all'
}

export enum FilterStatus {
  done = 'done',
  category = 'category'
}

export const apiBaseUrl = 'http://localhost:3000/tasks';
