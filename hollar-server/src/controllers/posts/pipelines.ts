import mongoose from "mongoose"
import { Post } from "../../models/posts.model.js"

export async function getPostPipeline(id: string, userId?: string) {
    const match = {
        $match: { _id: new mongoose.Types.ObjectId(id) }
    }

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
    const roomLookup = {
        $lookup: {
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            as: "roomDetails"
        },

    }
    const roomUnwind = {
        $unwind: "$roomDetails"
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
            "roomDetails.id": "$roomDetails._id",
            "roomDetails.cover": 1,
            "roomDetails.name": 1,
            likes: 1,
            comment: 1,
            createdAt: 1,
            replyCount: { $size: "$replies" },
            likesCount: { $size: "$likes" }
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
    const pipeline = [match, authorLookup, authorUnwind, roomLookup, roomUnwind, project, addFields]

    console.log('hey')
    const post = await Post.aggregate(pipeline)
    return post[0]


}