import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gllindcbmgytrvsnjrwx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsbGluZGNibWd5dHJ2c25qcnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5MjI1NjMsImV4cCI6MjAxMjQ5ODU2M30.RBzwni7PSZAuyxwkxfCNxjYN8oQfpJbrBd9OAkE3wUA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})