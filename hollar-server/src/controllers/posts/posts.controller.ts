import { Post } from '../../models/posts.model.js'


export async function getAllPosts() {
    return await Post.find({})
}

export async function getPost(id: string) {
    const post = await Post.find({ _id: id }).exec()
    return
}

export async function postsPaginator(limit: number, pageNo: number) {
    return await Post.find().skip((pageNo - 1) * limit).limit(limit).exec()
}

export async function addPost(comment: string, author: any, room: any, date: string) {
    return await Post.create({ comment, author, room, date })
}


export async function deletePost(id: string) {
    const result = await Post.deleteOne({ _id: id })
    if (!result) return { message: "error occured", error: true }
    return { message: "postdeleted", success: true }

}