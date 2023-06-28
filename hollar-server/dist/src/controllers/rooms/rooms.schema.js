export const typeDef = `
    extend type Query {
        rooms: [Room]
        room(id: ID!): Room
        searchTvTitles(title: String!): [Tv]

    }
    
    type Mutation {
        createRoom(fullName: String!, email: String!,  color: String!, id: ID, avatar: String,) : Room
        removeRoom(id: ID!) : Error 
    }

    type Room {
        id: ID
        cover: String
        description: String
        date: String
        creator: User
        name: String
        tv: Tv
        posts: [Post]
        likes: [User]
        dislikes: [User]
        createdAt: String
        updatedAt: String
    }

    type Tv{
        Actors: String
        Awards: String
        BoxOffice: String
        DVD: String
        Director: String
        Genre: String
        Language: String
        Metascore: String
        Plot: String
        Poster: String
        Production: String
        Rated: String
        Ratings: [TvRating]
        Released: String
        Response: String
        Runtime: String
        Title: String
        Type: String
        Website: String
        Writer: String
        Year: String
        inRoom: Boolean
        imddbID: String
        imdbRating: String
        imdbVotes: String
    }

    type TvRating{
        source: String
        value: String
    }
`;
