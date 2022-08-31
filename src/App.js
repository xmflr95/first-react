import React, { useCallback, useMemo, useReducer, useRef, useState } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,  // input 초기화
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  
  const { users } = state;
  const { username, email } = state.inputs;

  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: '',
  // });
  // const { username, email } = inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;    
  //   setInputs(inputs => ({
  //     ...inputs,
  //     [name]: value
  //   }));
  // }, []);
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'velopert',
  //     email: 'public.velopert@gmail.com',
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     username: 'tester',
  //     email: 'tester@example.com',
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'liz',
  //     email: 'liz@example.com',
  //     active: false
  //   },
  // ]);
  
  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   // setUsers([...users, user]);
  //   setUsers(users => users.concat(user)); // 함수형 업데이트

  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // }, [username, email]);

  // const onRemove = useCallback
  // (
  //     id => {
  //     setUsers(users => users.filter(user => user.id != id));
  //   }, 
  //   [users]
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setUsers(users => 
  //       users.map(user => 
  //         user.id === id ? { ...user, active: !user.active } : user
  //       )
  //     );
  // }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
  
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={ users } 
        onRemove={onRemove} 
        onToggle={onToggle} 
      />
      <div>활성사용자 수 : {count}</div>      
    </>
  );
}

export default App;
