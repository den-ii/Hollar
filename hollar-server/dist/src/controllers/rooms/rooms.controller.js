// IMPORTS
import { Room } from '../../models/rooms.model.js';
import axios from 'axios';
import { GraphQLError } from 'graphql';
import { getUser } from '../users/users.controller.js';
// CONTROLLERS
// Search for movie/tvseries
export async function searchTvTitles(title) {
    const key = process.env.OMD_KEY;
    console.log('title', title);
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
        console.log(response.data);
        return response.data.results.map(async (d) => {
            const inRoom = await getRoomByName(d.title);
            if (inRoom.length) {
                d.inRoom = true;
            }
            else {
                d.inRoom = false;
                console.log(d);
            }
            console.log(d);
            return d;
        });
    }
    catch (error) {
        console.error(error);
        throw new GraphQLError('OMD error.', {
            extensions: {
                code: 'OMD_ERROR',
                err: error
            }
        });
    }
}
// getAllRooms
export async function getAllRooms() {
    return await Room.find({});
}
//getRoomsBy Search 
export async function getRoomsBySearch(cursor, limit, search) {
    let re = new RegExp(search, "gi");
    if (!cursor || !cursor.length) {
        const rooms = await Room.find({ name: re }).sort('-updatedAt').limit(limit);
        console.log('no cursor', rooms);
        return rooms;
    }
    else {
        const c = Number(cursor);
        const rooms = await Room.find({ name: re, updatedAt: { $lt: c } }).sort('-updatedAt').limit(limit);
        console.log(rooms);
        return rooms;
    }
    // const rooms = await Room.find({})
    // return rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()))
}
export async function getAllRoomsPaginated(cursor, limit) {
    if (!cursor || !cursor.length) {
        const rooms = await Room.find({}).sort('-updatedAt').limit(limit);
        console.log('no cursor', rooms);
        return rooms;
    }
    else {
        const rooms = await Room.find({ updatedAt: { $lt: cursor } }).sort('-updatedAt').limit(limit);
        console.log(rooms);
        return rooms;
    }
}
export async function getRoom(id) {
    return await Room.findById(id).exec();
}
export async function roomWithPost(id, cursor, limit) {
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
        }).exec();
        return result;
    }
    else {
        const c = Number(cursor);
        console.log(c);
        const result = await Room.findById({ _id: id }).populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } },
            match: { createdAt: { $lt: c } },
            populate: {
                path: 'author'
            },
            perDocumentLimit: limit
        }).exec();
        console.log(result);
        return result;
    }
}
// getARoomByName
export async function getRoomByName(name) {
    return await Room.find({ name }).exec();
}
// addaRoom
export async function addRoom(movie) {
    return await Room.create({
        ...movie
    });
}
// likes
export async function likeRoom(roomId, userId) {
    const room = await getRoom(roomId);
    const user = await getUser(userId);
    if (room && user) {
        await Room.updateOne({ _id: roomId }, { $pull: { dislikes: userId } });
        await Room.updateOne({ _id: roomId }, { $pull: { likes: userId } });
        const ll = await Room.findOne({ _id: roomId, likes: userId });
        console.log('ll', ll);
        await room.likes.push(user.id);
        room.save();
        console.log(room);
        return room;
    }
    else if (!room) {
        throw new GraphQLError('like error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'Room not found'
            }
        });
    }
    else {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'User not found'
            }
        });
    }
}
// dislike
export async function dislikeRoom(roomId, userId) {
    const room = await getRoom(roomId);
    const user = await getUser(userId);
    console.log('enter');
    if (room && user) {
        await Room.updateOne({ _id: roomId }, { $pull: { likes: userId } });
        await Room.updateOne({ _id: roomId }, { $pull: { dislikes: userId } });
        await room.dislikes.push(user.id);
        console.log('dis');
        room.save();
        console.log(room);
        return room;
    }
    else if (!room) {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'Room not found'
            }
        });
    }
    else {
        throw new GraphQLError('dislike error.', {
            extensions: {
                code: 'ROOM_ERROR',
                err: 'User not found'
            }
        });
    }
}
export async function deleteRoom(id) {
    const result = await Room.deleteOne({ _id: id });
    if (!result)
        return { message: "error occured", error: true };
    return { message: "user deleted", success: true };
}
