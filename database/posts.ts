import { supabase } from '../supabase'

export async function createPost(data: {
    author_id: string
    content: string
    tag?: string
    image_url?: string
    project_id?: string
}) {
    return await supabase.from('posts').insert(data)
}

export async function getAllPosts() {
    const { data } = await supabase
        .from('posts')
        .select('*, users(name, handle, avatar_url, role)')
        .order('created_at', { ascending: false })
    return data
}

export async function likePost(id: string, currentLikes: number) {
    return await supabase
        .from('posts')
        .update({ likes: currentLikes + 1 })
        .eq('id', id)
}