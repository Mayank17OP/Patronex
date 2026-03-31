import { supabase } from '../supabase'

export async function createUser(id: string, data: {
    email: string
    name: string
    role: 'creator' | 'developer' | 'supporter'
    avatar_url?: string
    github_username?: string
}) {
    return await supabase.from('users').insert({ id, ...data })
}

export async function getUser(id: string) {
    const { data } = await supabase.from('users').select('*').eq('id', id).single()
    return data
}

export async function updateUser(id: string, updates: Partial<{
    name: string
    handle: string
    bio: string
    avatar_url: string
    github_username: string
}>) {
    return await supabase.from('users').update(updates).eq('id', id)
}