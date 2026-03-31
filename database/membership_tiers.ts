import { supabase } from '../supabase'

export async function createTier(data: {
    project_id: string
    name: string
    price: number
    billing_cycle: 'monthly' | 'yearly'
    benefits: string[]
}) {
    return await supabase.from('membership_tiers').insert(data)
}

export async function getTiersByProject(project_id: string) {
    const { data } = await supabase
        .from('membership_tiers')
        .select('*')
        .eq('project_id', project_id)
        .eq('is_active', true)
    return data
}