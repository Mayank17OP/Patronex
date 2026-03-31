import { supabase } from '../supabase'

export async function createSubscription(data: {
    supporter_id: string
    tier_id: string
    project_id: string
}) {
    return await supabase.from('subscriptions').insert({
        ...data,
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })
}

export async function getSubscriptionsBySupporter(supporter_id: string) {
    const { data } = await supabase
        .from('subscriptions')
        .select('*, membership_tiers(name, price), projects(title)')
        .eq('supporter_id', supporter_id)
        .eq('status', 'active')
    return data
}