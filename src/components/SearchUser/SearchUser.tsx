'use client';

import { useState, useEffect, useRef } from 'react';
import { type UserData, ChatsData } from '@/api/types';
import { fetchUser } from '@/api/user/fetchUser';
import { postChat } from '@/api/chats/postChats';
import { useRouter } from 'next/navigation';
import s from "./searchuser.module.scss"

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useRef<UserData[]>([]);
  const users = useRef<UserData[]>([]);
  const router = useRouter();

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

  //create new chat
  async function createNewChat(userTo: UserData) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.log("no stored user");
      return;
    }

    const user = JSON.parse(storedUser) as UserData;
    const newChat: ChatsData = { user1: user.id, user2: userTo.id };
    const result = await postChat(newChat);
    return result;
  }

  //go to new chat
  function goToChat(newChatId: string) {
    router.push(`/chat/${newChatId}`)
  }

  async function handleClick(user: UserData) {
    const chat = await createNewChat(user);

    if (chat?.id) {
      goToChat(chat.id);
    }
  }

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
              onClick={() => handleClick(user)}
            >
              <p className={s.user}>{user.username}</p>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && (
        <p>User don’t found</p>
      )}
    </div>
  );
}

export default UserSearch;
