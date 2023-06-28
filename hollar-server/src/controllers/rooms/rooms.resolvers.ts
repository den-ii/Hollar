import { getAllRooms, getRoom, addRoom, deleteRoom, searchTvTitles } from './rooms.controller.js'



export const resolvers = {
    Query: {
        rooms: () => getAllRooms(),
        room: (_, { id }) => getRoom(id),
        searchTvTitles: (_, { title }) => searchTvTitles(title)
    },
    Mutation: {
        createRoom: (_, { name, cover, date, description, creator }) => {
            return addRoom(name, cover, date, description, creator)
        },
        removeRoom: (_, { id }) => {
            return deleteRoom(id)
        }

    }
}