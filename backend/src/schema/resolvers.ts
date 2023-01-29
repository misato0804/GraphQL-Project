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
    }
}