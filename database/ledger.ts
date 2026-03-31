import { supabase } from '../supabase'

export async function createLedgerEntry(data: {
    transaction_id?: string
    entry_type: 'subscription' | 'refund' | 'payout' | 'escrow_lock' | 'escrow_release'
    amount: number
    description: string
}) {
    const hash = btoa(JSON.stringify({ ...data, ts: Date.now() }))
    return await supabase.from('ledger_entries').insert({ ...data, hash })
}

export async function getAllLedgerEntries() {
    const { data } = await supabase
        .from('ledger_entries')
        .select('*, transactions(stripe_payment_id, status)')
        .order('created_at', { ascending: false })
    return data
}