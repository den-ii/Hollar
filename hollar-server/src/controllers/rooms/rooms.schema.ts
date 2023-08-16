export const typeDef = `
    extend type Query {
        rooms: [Room]
        roomsPaginate(cursor: String, limit: Int, userId: ID): [RoomWithLikes]
        room(id: ID!): Room
        searchTvTitles(title: String!): [Tv]
        searchRooms(cursor: String, limit: Int, search: String!): [Room]
        roomPosts(id: ID!, cursor: String!, limit: Int!, userId: ID): [RoomandPosts]

    }
    
    type Mutation {
        createRoom(name: String!, cover: String!, tv: ITv, description: String, creator: String) : Room
        removeRoom(id: ID!) : Error 
        likeRoom(roomId: ID!, userId: ID!): Room
        dislikeRoom(roomId: ID!, userId: ID!): Room

    }
    
    type Room {
        id: ID
        cover: String
        description: String
        creator: User
        name: String
        objectPosition: String
        tv: Tv
        posts: [ID]
        likes: [ID]
        dislikes: [ID]
        createdAt: String
        updatedAt: String
    }
   type AuthorDetails{
        fullName: String
        username: String
        avatar:String
        id: ID
        favourite: String
   }   
   type RoomDetails {
        name: String
        cover: String
        id: ID
   }
    type RoomandPosts{
        id: ID
        author: ID
        likes: [ID]
        comment: String
        authorDetails: AuthorDetails
        replyCount: Int
        likesCount: Int
        userLiked: Int
        createdAt: String
    }

    type RoomWithLikes {
        id: ID
        cover: String
        description: String
        creator: User
        name: String
        objectPosition: String
        tv: Tv
        dislikes: [ID]
        postsCount: Int
        likesCount: Int
        dislikesCount: Int
        userLiked: Int
        userDisliked: Int
        createdAt: String
        updatedAt: String

    }
    type RoomWithPost {
        id: ID
        commentsCount: Int
        likesCount: Int
        userLiked: Int
        comment: String
        cover: String
        description: String
        creator: User
        name: String
        objectPosition: String
        tv: Tv
        posts: [PostWithUser]
        likes: [ID]
        dislikes: [ID]
        createdAt: String
        updatedAt: String
    }

    type RoomWithPost2 {
        id: ID
        cover: String
        description: String
        creator: User
        name: String
        objectPosition: String
        tv: Tv
        posts: [PostWithUser]
        likes: [ID]
        dislikes: [ID]
        createdAt: String
        updatedAt: String
    }

    type Tv{
       id: String
       image: TvImage
       runningTimeInMinutes: Int
       title: String
       titleType: String
       year: Int
       principals: [Principals]
       inRoom: Boolean
    }

    type TvImage{
        height:Int
        id:String
        url:String
        width:Int
    }

    type Principals{
        disambiguation: String
        id:String
        legacyNameText:String
        name:String
        billing:Int
        category:String
        characters: [String]
        roles: [Roles]
    }

    type Roles {
        characters : String
    }
    
    input ITv{
        id: String
        image: ITvImage
        runningTimeInMinutes: Int
        title: String
        titleType: String
        year: Int
        principals: [IPrincipals]
     }
     input ITvImage{
        height:Int
        id:String
        url:String
        width:Int
     }
 
     input IPrincipals{
         disambiguation: String
         id:String
         legacyNameText:String
         name:String
         billing:Int
         category:String
         characters: [String]
         roles: [IRoles]
     }
 
     input IRoles {
         characters : String
     }
    
    type TvRating{
        source: String
        value: String
    }
    type Tv2{
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

`;