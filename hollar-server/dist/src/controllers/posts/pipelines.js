import mongoose from "mongoose";
import { Post } from "../../models/posts.model.js";
import { Reply } from "../../models/replies.model.js";
export async function postPipeline(id, userId, match) {
    const authorLookup = {
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails"
        },
    };
    const authorUnwind = {
        $unwind: "$authorDetails"
    };
    const roomLookup = {
        $lookup: {
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            as: "roomDetails"
        },
    };
    const roomUnwind = {
        $unwind: "$roomDetails"
    };
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
    };
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
    };
    const sort = {
        $sort: { createdAt: -1 }
    };
    const pipeline = [match, authorLookup, authorUnwind, roomLookup, roomUnwind, project, addFields, sort];
    console.log('hey');
    const result = await Post.aggregate(pipeline);
    return result;
}
export async function getPostPipeline(id, userId) {
    const match = {
        $match: { _id: new mongoose.Types.ObjectId(id) }
    };
    const post = await postPipeline(id, userId, match);
    return post[0];
}
export async function getReplies(reply) {
    const authorLookup = {
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails"
        },
    };
    const sort = {
        $sort: { createdAt: -1 }
    };
    const authorUnwind = {
        $unwind: "$authorDetails"
    };
    const project = {
        $project: {
            id: "$_id",
            author: 1,
            "authorDetails.id": "$authorDetails._id",
            "authorDetails.username": 1,
            "authorDetails.fullName": 1,
            "authorDetails.avatar": 1,
            "authorDetails.favourite": 1,
            post: 1,
            treplies: 1,
            likes: 1,
            comment: 1,
            createdAt: 1,
            replyCount: { $size: "$replies" },
            likesCount: { $size: "$likes" }
        }
    };
    const addFields = {
        $addFields: {
            userLiked: {
                $size: {
                    $filter: {
                        input: "$likes",
                        as: "like",
                        cond: {
                            $eq: [
                                '$$like', new mongoose.Types.ObjectId(reply.userId)
                            ]
                        }
                    }
                }
            }
        }
    };
    const match = reply.match;
    console.log(match);
    const pipeline = [match, authorLookup, authorUnwind, project, addFields];
    if (!reply.sort) {
        pipeline.push(sort);
    }
    else {
        pipeline.push(reply.sort);
    }
    const result = await Reply.aggregate(pipeline);
    console.log('result', result);
    return result;
}
export async function getReplyPipeline(id, userId) {
    const match = {
        $match: {
            _id: new mongoose.Types.ObjectId(id)
        }
    };
    const reply = await getReplies({ id, userId, match });
    console.log(reply);
    return reply[0];
}
export async function authorPostRepliesPipeline(id, authorId, userId) {
    const match = {
        $match: {
            post: new mongoose.Types.ObjectId(id), author: new mongoose.Types.ObjectId(authorId), treplies: []
        }
    };
    const sort = {
        $sort: { createdAt: 1 }
    };
    const reply = await getReplies({ id, userId, match, sort });
    console.log(reply);
    return reply;
}
export async function postRepliesPipeline(id, authorId, userId, cursor, limiter) {
    const c = Number(cursor) || '';
    const timestamp = new Date(c) || '';
    let match;
    if (!cursor || !cursor.length) {
        match = {
            $match: {
                $and: [
                    { post: new mongoose.Types.ObjectId(id), treplies: [] },
                    { $expr: { $ne: ["$author", new mongoose.Types.ObjectId(authorId)] } },
                ],
            },
        };
    }
    else {
        match = {
            $match: {
                $and: [
                    { post: new mongoose.Types.ObjectId(id), treplies: [] },
                    { $expr: { $ne: ["$author", new mongoose.Types.ObjectId(authorId)] } },
                    { $expr: { $lt: ["$createdAt", timestamp] } },
                ],
            },
        };
    }
    const limit = {
        $limit: limiter
    };
    const reply = await getReplies({ id, userId, match, limit });
    console.log('postReply');
    return reply;
}
export async function authorReplyRepliesPipeline(id, authorId, userId) {
    const match = {
        $match: {
            lastReply: new mongoose.Types.ObjectId(id),
            author: new mongoose.Types.ObjectId(authorId),
        }
    };
    const sort = {
        $sort: { createdAt: 1 }
    };
    const reply = await getReplies({ id, userId, match, sort });
    return reply;
}
export async function replyRepliesPipeline(id, authorId, userId, cursor, limiter) {
    console.log('replyIDDD', id);
    const c = Number(cursor) || '';
    const timestamp = new Date(c) || '';
    let match;
    if (!cursor || !cursor.length) {
        match = {
            $match: {
                $and: [
                    {
                        lastReply: new mongoose.Types.ObjectId(id),
                        author: { $ne: new mongoose.Types.ObjectId(authorId) },
                    },
                ]
            },
        };
    }
    else {
        match = {
            $match: {
                $and: [
                    {
                        lastReply: new mongoose.Types.ObjectId(id),
                        author: { $ne: new mongoose.Types.ObjectId(authorId) },
                    },
                    { $expr: { $lt: ["$createdAt", timestamp] } },
                ],
            },
        };
    }
    const limit = {
        $limit: limiter
    };
    const reply = await getReplies({ id, userId, match, limit });
    console.log('replyReply', reply);
    return reply;
}
export async function tRepliesPipeline(idList, userId) {
    const match = {
        $match: {
            _id: { $in: idList.map(id => new mongoose.Types.ObjectId(id)) }
        }
    };
    const sort = {
        $sort: { createdAt: 1 }
    };
    // OR
    // const match = {
    //     $match: {
    //         lastReply: new mongoose.Types.ObjectId(id))
    //     }
    // }
    const reply = await getReplies({ userId, match, sort });
    console.log(reply);
    return reply;
}
export async function replyRepliesHeader(id, authorId, userId) {
    const match = {
        $match: {
            _id: new mongoose.Types.ObjectId(id)
        }
    };
    const replyList = await getReplies({ id, userId, match });
    const reply = replyList[0];
    const replyPost = String(reply.post);
    const [post, treplies] = await Promise.allSettled([getPostPipeline(replyPost, userId), tRepliesPipeline(reply.treplies, userId)]);
    if (post.status === 'fulfilled') {
        reply.post = post.value;
    }
    else {
        console.error('Error fetching post:', post.reason);
    }
    if (treplies.status === 'fulfilled') {
        reply.treplies = treplies.value;
    }
    else {
        console.error('Error fetching treplies:', treplies.reason);
    }
    console.log(reply);
    return reply;
    //getReply
    //getTreplies
    //getPost
}
