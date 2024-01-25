import React, { useEffect, useState } from 'react';

import { UsersList } from './components/UserList';
import { User } from './types';
import { getUsers } from './services/user';
import { Loader } from './components/Loader';
import { UserPosts } from './components/UserPosts';

/* comment
// функція робить запит на сервер 
// отримує RESPONCE і запускає обробку
// результатом THEN буде новий ПРОМІС 
// і цей новий проміс я отримаю із функції "getUsers()"

// далі викликаю "getUsers()"
// отримаю ПРОМІС, в якому вже запущенна обробка данних
// і коли вона завершується - запускається THEN
// і данні записуються в STATE
*/

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateAt, setUpdateAt] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getUsers()
        .then(setUsers)
        .catch(() => setErrorMessage('Try again later'))
        .finally(() => setLoading(false));
    }, 1000)
  }, [updateAt]);

  function reload() {
    setUpdateAt(new Date());
    setErrorMessage('');
  }

  return (
    <div className="section py-5">
      <div className="box">
        <div className="title">Users</div>

        <>
          {loading && (
            <Loader />
          )}

          {!loading && users.length > 0 && (
            <UsersList
              users={users}
              selectedUserId={selectedUser?.id}
              onSelect={setSelectedUser}
            />
          )}

          {!loading && !errorMessage && users.length === 0 && (
            <p className="title is-5">There are no user</p>
          )}

          {errorMessage && (
            <p className="notification is-danger">
              {errorMessage}
              <button onClick={reload}>Reload</button>
            </p>
          )}
        </>

        {/* <UserPosts userId={setSelectedUser} /> */}
        {selectedUser && (
          <UserPosts userId={selectedUser.id} />
        )}

      </div>
    </div>
  );
};
