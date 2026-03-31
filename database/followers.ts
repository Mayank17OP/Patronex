import { supabase } from '../supabase'

export async function followUser(follower_id: string, following_id: string) {
    return await supabase.from('followers').insert({ follower_id, following_id })
}

export async function unfollowUser(follower_id: string, following_id: string) {
    return await supabase.from('followers')
        .delete()
        .eq('follower_id', follower_id)
        .eq('following_id', following_id)
}

export async function getFollowers(user_id: string) {
    const { data } = await supabase
        .from('followers')
        .select('*, users!follower_id(name, handle, avatar_url)')
        .eq('following_id', user_id)
    return data
}