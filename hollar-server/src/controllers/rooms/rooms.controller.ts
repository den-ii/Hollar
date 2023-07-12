// IMPORTS
import { Room } from '../../models/rooms.model.js'
import axios from 'axios';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { getUser } from '../users/users.controller.js';
import mongoose from 'mongoose';



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
//getRoomsBy Search 
export async function getRoomsBySearch(cursor: string, limit: number, search: string) {
    let re = new RegExp(search, "gi")
    if (!cursor || !cursor.length) {
        const rooms = await Room.find({ name: re }).sort('-updatedAt').limit(limit)
        console.log('no cursor', rooms)
        return rooms
    }
    else {
        const c = Number(cursor)
        const rooms = await Room.find({ name: re, updatedAt: { $lt: c } }).sort('-updatedAt').limit(limit)
        console.log(rooms)
        return rooms

    }
    // const rooms = await Room.find({})
    // return rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()))
}

export async function getAllRoomsPaginated(cursor: string, limit: number) {
    if (!cursor || !cursor.length) {
        const rooms = await Room.find({}).sort('-updatedAt').limit(limit)
        console.log('no cursor', rooms)
        return rooms
    }
    else {
        const rooms = await Room.find({ updatedAt: { $lt: cursor } }).sort('-updatedAt').limit(limit)
        console.log(rooms)
        return rooms
    }
}
export async function getRoom(id: string) {
    return await Room.findById(id).exec()

}
export async function roomWithPost(id: string, cursor: string, limit: number) {
    // const room = await Room.findById(id).exec()
    // console.log('room', room)
    if (!cursor || !cursor.length) {
        const result = await Room.findById({ _id: id }).populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'author'
            },
            perDocumentLimit: limit
        }).exec()
        return result
    }
    else {

        const c = Number(cursor)
        console.log(c)
        const result = await Room.findById({ _id: id }).populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } },
            match: { createdAt: { $lt: c } },
            populate: {
                path: 'author'
            },
            perDocumentLimit: limit
        }).exec()
        console.log(result)
        return result
    }
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
// likes
export async function likeRoom(roomId: string, userId: string) {
    const room = await getRoom(roomId)
    const user = await getUser(userId)
    if (room && user) {
        await Room.updateOne({ _id: roomId }, { $pull: { dislikes: userId } })
        await Room.updateOne({ _id: roomId }, { $pull: { likes: userId } })
        const ll = await Room.findOne({ _id: roomId, likes: userId })
        console.log('ll', ll)
        await room.likes.push(user.id);
        room.save()
        console.log(room)
        return room
    }
    else if (!room) {
        throw new GraphQLError('like error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'Room not found'
            }
        })
    }
    else {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'User not found'
            }
        })
    }
}
// dislike
export async function dislikeRoom(roomId: string, userId: string) {
    const room = await getRoom(roomId)
    const user = await getUser(userId)
    if (room && user) {
        await Room.updateOne({ _id: roomId }, { $pull: { likes: userId } })
        await Room.updateOne({ _id: roomId }, { $pull: { likes: userId } })

        const ll = await room.likes.find(user.id);
        console.log('ll', ll)
        room.save()
        console.log(room)
        return room
    }
    else if (!room) {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'Room not found'
            }
        })
    }
    else {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'User not found'
            }
        })
    }
}
export async function deleteRoom(id: string) {
    const result = await Room.deleteOne({ _id: id })
    if (!result) return { message: "error occured", error: true }
    return { message: "user deleted", success: true }
}