// IMPORTS
import { Room } from '../../models/rooms.model.js'
import axios from 'axios';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';



// CONTROLLERS


// Search for movie/tvseries
export async function searchTvTitles(title: string) {
    const key = process.env.OMD_KEY
    console.log('title', title)
    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/title/find',
        params: { q: title },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data.results.map(async (d) => {
            const inRoom = await getRoomByName(d.title)
            if (inRoom.length) {
                d.inRoom = true
            }
            else {
                d.inRoom = false
                console.log(d)
            }
            console.log(d)
            return d
        });
    } catch (error) {
        console.error(error);
        throw new GraphQLError('OMD error.', {
            extensions: {
                code: 'OMD_ERROR',
                err: error
            }
        })
    }
}

// getAllRooms
export async function getAllRooms() {
    return await Room.find({})
}
export async function getAllRoomsPaginated(cursor: string, limit: number) {
    if (!cursor.length) {
        return await Room.find({}).sort('-updatedAt').limit(limit)
    }
    const rooms = await Room.find({ updatedAt: { $lt: new ObjectId(cursor) } }, { limit: limit }).sort('-updatedAt')
    return rooms
}
// export async function getAllRoomCursor(cursor: string, limit: number) {
//     const rooms = await Room.find({}).sort('-updatedAt')
//     const index = rooms.findIndex(r => r.id === cursor)
//     console.log(index)
//     const newRooms = rooms.slice(index + 1, limit)
//     const newCursor = newRooms[-1].id
//     return {
//         cursor: newCursor,
//         rooms: newRooms
//     }
// }
// getARoom
export async function getRoom(id: string) {
    return await Room.findById(id).exec()

}
// getARoomByName
export async function getRoomByName(name: string) {
    return await Room.find({ name }).exec()

}
// addaRoom
export async function addRoom(movie: { name: string, cover: string, creator: string, tv: any, description?: string }) {
    return await Room.create({
        ...movie
    });
}

export async function deleteRoom(id: string) {
    const result = await Room.deleteOne({ _id: id })
    if (!result) return { message: "error occured", error: true }
    return { message: "user deleted", success: true }
}