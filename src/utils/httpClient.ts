const BASE_URL = 'http://mate.academy/students-api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then((response) => {
      if (!response.ok) {
        throw new Error (`${response.status} ${response.statusText}`)
      }

      return response.json();
    })
}

// функція робить запит на сервер 
// отримує RESPONCE і запускає обробку
// результатом THEN буде новий ПРОМІС 
// і цей новий проміс я отримаю із функції "getUsers()"
