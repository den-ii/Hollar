import { getAllRooms, getRoom, addRoom, deleteRoom, searchTvTitles, getAllRoomsPaginated } from './rooms.controller.js'



export const resolvers = {
    Query: {
        rooms: () => getAllRooms(),
        room: (_, { id }) => getRoom(id),
        searchTvTitles: (_, { title }) => searchTvTitles(title),
        roomsPaginate: (_, { cursor, limit }) => getAllRoomsPaginated(cursor, limit),
        // roomsCursored: (_, { cursor, limit }) => getAllRoomCursor(cursor, limit)

    },
    Mutation: {
        createRoom: (_, { name, cover, description, tv, creator }) => {
            return addRoom({ name, cover, description, tv, creator })
        },
        removeRoom: (_, { id }) => {
            return deleteRoom(id)
        }

    }
}