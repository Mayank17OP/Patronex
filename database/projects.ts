import { supabase } from '../supabase'

export async function createProject(data: {
    owner_id: string
    title: string
    description: string
    github_repo_url?: string
    category: 'creator' | 'developer'
    funding_goal?: number
}) {
    return await supabase.from('projects').insert(data)
}

export async function getAllProjects() {
    const { data } = await supabase
        .from('projects')
        .select('*, users(name, handle, avatar_url)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
    return data
}

export async function getProjectsByUser(owner_id: string) {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', owner_id)
    return data
}