import { supabase } from '../supabase'

export async function syncUserToSupabase(firebaseUser: {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  providerData: any[]
}) {
  const { uid, email, displayName, photoURL, providerData } = firebaseUser

  const isGithub = providerData.some(p => p.providerId === 'github.com')

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', uid)
    .single()

  if (!existingUser) {
    await supabase.from('users').insert({
      id: uid,
      email: email ?? '',
      name: displayName ?? 'New User',
      avatar_url: photoURL ?? '',
      role: isGithub ? 'developer' : 'creator',
      github_username: isGithub ? providerData[0]?.login ?? '' : '',
    })
  }
}