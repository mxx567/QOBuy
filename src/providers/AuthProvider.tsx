import { AuthContext } from '@/src/hooks/AuthContext'
import { supabase } from '@/utils/supabase'
import { PropsWithChildren, useEffect, useState } from 'react'
export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<Record<string, any> | undefined | null>()
  const [profile, setProfile] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    let active = true

    const syncAuthState = async () => {
      setIsLoading(true)

      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) console.error('Error getting session:', sessionError)

        const { data: claimsData, error: claimsError } = await supabase.auth.getClaims()
        if (claimsError) console.error('Error fetching claims:', claimsError)

        const nextClaims = claimsData?.claims ?? null

        if (!active) return
        setClaims(nextClaims)

        if (!nextClaims?.sub) {
          setProfile(null)
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', nextClaims.sub)
          .maybeSingle()

        if (!active) return

        if (error) {
          console.error('Error fetching profile:', error)
          setProfile(null)
        } else {
          setProfile(data ?? null)
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    syncAuthState()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      void syncAuthState()
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  
  // Fetch the claims once, and subscribe to auth state changes
  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.auth.getClaims()
      if (error) {
        console.error('Error fetching claims:', error)
      }
      setClaims(data?.claims ?? null)
      setIsLoading(false)
    }
    fetchClaims()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      console.log('Auth state changed:', { event: _event })
      const { data } = await supabase.auth.getClaims()
      setClaims(data?.claims ?? null)
    })
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  // Fetch the profile when the claims change
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      if (claims) {
        const { data } = await supabase.from('profiles').select('*').eq('id', claims.sub).single()
        setProfile(data)
      } else {
        setProfile(null)
      }
      setIsLoading(false)
    }
    fetchProfile()
  }, [claims])
  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: Boolean(claims?.sub),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}