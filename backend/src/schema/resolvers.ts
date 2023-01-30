import {users, movies} from "../userLink";

export const resolvers = {
    Query : {
        users () {
            return users;
        },
        user (_: any, args: any){
            const user = users.find( user => user.id === Number(args.id))
            return user;
        },
        movies () {
            return movies;
        },
        movie (_:any, args: any) {
            const movie = movies.find(movie => movie.name === args.name)
            return movie
        },
    },
    User: {
        favouriteMovies: () => {
            const movie = movies.filter( movie => movie.published === true)
            console.log(movie)
            return movie
        }
    },
    Mutation: {
        createUser: (_:any, args: any) => {
            const user = args.input
            const lastId = users[users.length -1].id
            console.log(lastId)
            user.id = lastId + 1
            users.push(user)
            return user
        },
        updateUsername: (_:any, args: any) => {
            const id = args.input.id
            const newUsername = args.input.newUsername
            let userUpdated;
            users.forEach(user => {
                if (user.id == id) {
                    user.username = newUsername
                    userUpdated = user
                }
            })
            return userUpdated
        },
        deleteUser: (_:any, args: any) => {
            const id = args.id
            console.log(id)
            const newList = users.filter(user => user.id !== Number(id))
            console.log(newList)
            return newList
        }
    }
}