import React, {useState} from 'react';
import {useQuery, gql, useLazyQuery, useMutation} from "@apollo/client"
import {User} from "./User";

interface UserQueryResponse {
    users: User[]
}

const QUERY_ALL_USERS = gql`
    query Users {
        users {
            age
            username
            name
        }
    }
`

const QUERY_SEARCH_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            name
            age
        }
    }
`

const SEARCH_AGE = gql`
    query GetUserByAge ($age: Int!) {
        userAgeA(age: $age) {
            name
        }
    }
`

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            age
            username
        }
    }
`


const DisplayUser = () => {
    const [userId, setUserId] = useState(0)
    const [userAge1, setUserAge] = useState(31)
    const {data, loading, error, refetch } = useQuery<UserQueryResponse>(QUERY_ALL_USERS)
    const [fetchUser, {data: userSearchData, error: userError},] = useLazyQuery(QUERY_SEARCH_USER)
    const [fetchUserAge, {data: userSearchAge, error: userAgeError},] = useLazyQuery(SEARCH_AGE)

    const [newUser, setNewUser] = useState<User>({name: "", age: 0, username: ""})
    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    const [createUser] = useMutation(CREATE_USER_MUTATION)


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (userSearchAge) {
        console.log(userSearchAge)
    }

    console.log(newUser)

    return (
        <div>
            {data && data.users.map(user => (
                <h1 key={user.name}>{user.name} | {user.username} | {user.age}</h1>
            ))}
            <input type="text" onChange={(event) => setUserId(Number(event.target.value))}/>
            <button onClick={() => fetchUser({variables: {id: userId}})}>Fetch User</button>
            <h5>{userSearchData && userSearchData.user.name}</h5>
            <button onClick={() => fetchUserAge({variables: {age: userAge1}})}>Age</button>
            {userSearchAge &&
                <>
                    <h1>{userSearchAge.userAgeA.name} </h1>
                </>
            }
            <h1>{userAge1}</h1>
            <div>
                <form>
                    <input type="text" name="name" placeholder="name" onChange={(e) => setName(e.target.value)}/>
                    <input type="number" name="age" placeholder="age" onChange={(e) => setAge(Number(e.target.value))}/>
                    <input type="text" name="username" placeholder="username"
                           onChange={(e) => setUsername(e.target.value)}/>
                    {/* eslint-disable-next-line no-restricted-globals */}
                    <button onClick={() => createUser({variables: {input: {name, age, username}}})}>send</button>
                </form>
            </div>
        </div>
    );
};

export default DisplayUser;