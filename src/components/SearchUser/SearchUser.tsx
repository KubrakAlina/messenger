'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { type UserData } from '@/api/types';
import { fetchUser } from '@/api/user/fetchUser';
import s from "./searchuser.module.scss"

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useRef<UserData[]>([])
  const router = useRouter();
  const users = useRef<UserData[]>([]);

  useEffect(() => {
    //load all users
    const loadUsers = async () => {
      users.current = await fetchUser();
      return users;
    }
    loadUsers();

    //find logged user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.current = JSON.parse(storedUser);
    } else { return }

  }, [])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        const finded = users.current.filter((user => user.username.includes(query.toLowerCase())))
        setResults(() => [...finded])
        if (results) {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className={s.container}>
      <input
        name="user"
        type="text"
        value={query}
        onChange={e => {
          setLoading(true);
          setQuery(e.target.value)
        }}
        placeholder="Find user"
        className={s.input}
        autoComplete="off"
      />

      {loading && <p>Loading...</p>}

      {results.length > 0 && !loading && (
        <ul className={s.list}>
          {results.map(user => (
            <li
              key={user.id}
              className={s.item}
              onClick={() => router.push(`/chat/${user.id}`)}
            >
              <p className={s.user}>{user.username}</p>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && (
        <p className="">User don’t found</p>
      )}
    </div>
  );
}

export default UserSearch;
