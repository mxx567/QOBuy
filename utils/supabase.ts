import { createClient } from '@supabase/supabase-js'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'
const hasBrowserStorage = isWeb && typeof window !== 'undefined'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (isWeb) {
      return Promise.resolve(hasBrowserStorage ? window.localStorage.getItem(key) : null)
    }
    console.debug('getItem', { key, getItemAsync })
    return getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    if (isWeb) {
      if (hasBrowserStorage) window.localStorage.setItem(key, value)
      return Promise.resolve()
    }
    if (value.length > 2048) {
      console.warn(
        'Value being stored in SecureStore is larger than 2048 bytes and it may not be stored successfully. In a future SDK version, this call may throw an error.'
      )
    }
    return setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    if (isWeb) {
      if (hasBrowserStorage) window.localStorage.removeItem(key)
      return Promise.resolve()
    }
    return deleteItemAsync(key)
  },
}

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '',
  {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)