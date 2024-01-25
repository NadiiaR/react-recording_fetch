import { User } from "../types";
import { getData } from "../utils/httpClient";

export function getUsers() {
  return getData<User[]>('/users')
    .then(user => user.slice(0, 10));
}
