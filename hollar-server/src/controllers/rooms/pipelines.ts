import mongoose from "mongoose"
import { Post } from "../../models/posts.model.js"
import { Room } from "../../models/rooms.model.js"


export async function getRoomsPaginatedPipeline(cursor: string, limit: number, userId?: string) {
    console.log(cursor, limit, userId)
    const sort = {
        $sort: { updatedAt: -1 }
    }
    const project = {
        $project: {
            id: "$_id",
            name: 1,
            cover: 1,
            tv: 1,
            likes: 1,
            likesCount: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0 } },
            posts: 1,
            postsCount: { $cond: { if: { $isArray: "$posts" }, then: { $size: "$posts" }, else: 0 } },
            dislikes: 1,
            dislikesCount: { $cond: { if: { $isArray: "$dislikes" }, then: { $size: "$dislikes" }, else: 0 } },
            updatedAt: 1
        }
    }

    const addFields = {
        $addFields: {
            userLiked: {
                $size: {
                    $filter: {
                        input: "$likes",
                        as: "like",
                        cond: {
                            $eq: ['$$like', new mongoose.Types.ObjectId(userId)]
                        }
                    }
                }

            },
            userDisliked: {
                $size: {
                    $filter: {
                        input: "$dislikes",
                        as: "dislike",
                        cond: { $eq: ['$$dislike', new mongoose.Types.ObjectId(userId)] }
                    }
                }
            }

        }
    }
    const limiter = { $limit: limit }
    const pipeline: any = [sort, project, limiter];
    if (cursor && cursor.length) {
        const c = Number(cursor)
        const timestamp = new Date(c)
        const match = {
            $match: {
                $expr: {
                    $lt: ["$updatedAt", timestamp]
                }
            }
        }
        pipeline.unshift(match)
    }
    if (userId?.length) {
        pipeline.pop()
        pipeline.push(addFields)
        pipeline.push(limiter)
    }
    console.log(pipeline)
    const result = await Room.aggregate(pipeline);
    console.log(result)
    return result;

}

export async function roomWithPostPipeline(id: string, cursor: string, limit: number, userId?: string,) {
    const c = Number(cursor) || ''
    const timestamp = new Date(c) || ''
    let match
    if (!cursor || !cursor.length) {
        match = {
            $match: { room: new mongoose.Types.ObjectId(id) },
        }
    } else {
        match = {
            $match: {
                $and: [
                    { room: new mongoose.Types.ObjectId(id) },
                    { $expr: { $lt: ["$createdAt", timestamp] } },
                ],
            },
        };
    }
    const sorts = { $sort: { createdAt: -1 } }
    const authorLookup = {
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails"
        },

    }
    const authorUnwind = {
        $unwind: "$authorDetails"
    }

    const project = {
        $project: {
            id: "$_id",
            author: 1,
            "authorDetails.id": "$authorDetails._id",
            "authorDetails.username": 1,
            "authorDetails.fullName": 1,
            "authorDetails.avatar": 1,
            "authorDetails.favourite": 1,
            likes: 1,
            comment: 1,
            createdAt: 1,
            replyCount: { $cond: { if: { $isArray: "$replies" }, then: { $size: "$replies" }, else: "0" } },
            likesCount: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: "0" } },
        }
    }
    const addFields = {
        $addFields: {
            userLiked: {
                $size: {
                    $filter: {
                        input: "$likes",
                        as: "like",
                        cond: {
                            $eq: [
                                '$$like', new mongoose.Types.ObjectId(userId)
                            ]
                        }

                    }
                }

            }
        }
    }
    const limiter = {
        $limit: limit
    }
    const pipeline = [match, sorts, authorLookup, authorUnwind, project, addFields, limiter];

    const result = await Post.aggregate(pipeline);
    return result;

}