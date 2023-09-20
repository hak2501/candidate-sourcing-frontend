export interface User {
  username: string;
  email: string;
  permissions: string[];
}

export interface UserTable extends User {
  widgetType: string;
}
