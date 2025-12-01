'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import { type UserData, ChatsData } from '@/api/types';
import { fetchUser } from '@/api/user/fetchUser';
import { fetchChats } from '@/api/chats/fetchChats';
import { postChat } from '@/api/chats/postChats';
import { useRouter } from 'next/navigation';
import MessengerContext from "@/context/MessengerContext";
import s from "./searchuser.module.scss"

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatsList, setChatsList] = useState<ChatsData[]>([]);
  const users = useRef<UserData[]>([]);
  const router = useRouter();
  const context = useContext(MessengerContext);
  const { currentUser } = context;

  useEffect(() => {
    if (currentUser) {
      const loadUsers = async () => {
        users.current = await fetchUser();
        return users;
      }

      const loadChats = async () => {
        const chats = await fetchChats();
        setChatsList(chats);
      }
      loadUsers();
      loadChats()
    }
    else { return }

  }, [currentUser])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        const finded = users.current.filter((user => user.username.includes(query.toLowerCase())));
        const filtered = finded.filter((findedUser => findedUser.id !== currentUser?.id))
        setResults(() => [...filtered])
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

  async function findExistentChat(userTo: UserData) {
    if (currentUser) {
      const filtered = chatsList.filter((chat) => chat.user1.id === userTo.id || chat.user2.id === userTo.id)[0];
      return filtered;
    }
  }

  //create new chat
  async function createNewChat(userTo: UserData) {
    if (currentUser) {
      const newChat: ChatsData = { user1: { id: currentUser.id, name: currentUser.name }, user2: { id: userTo.id, name: userTo.name } };
      const result = await postChat(newChat);
      return result;
    }
  }

  //go to new chat
  function goToChat(newChatId: string) {
    router.push(`/chat/${newChatId}`)
  }

  async function handleClick(user: UserData) {
    let chat;
    try {
      chat = await findExistentChat(user);
      console.log(chat);
    } catch (error) {
      chat = await createNewChat(user);
    }

    finally {
      if (chat?.id) {
        goToChat(chat.id);
      }
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
