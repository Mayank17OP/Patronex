import { supabase } from '../supabase'

export async function createMilestone(data: {
    project_id: string
    title: string
    description: string
    target_amount: number
}) {
    return await supabase.from('milestones').insert(data)
}

export async function getMilestonesByProject(project_id: string) {
    const { data } = await supabase
        .from('milestones')
        .select('*')
        .eq('project_id', project_id)
    return data
}

export async function completeMilestone(id: string) {
    return await supabase
        .from('milestones')
        .update({ is_completed: true, completed_at: new Date().toISOString() })
        .eq('id', id)
}