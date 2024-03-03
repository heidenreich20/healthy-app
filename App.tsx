import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { supabase } from './supabase/supabase'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { Session } from '@supabase/supabase-js'
import store from './redux/store'
import Auth from './components/Auth'
import Nav from './components/Nav/Nav'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon.ttf'),
  });

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })
      .catch((error: Error) => {
        console.error('Error fetching session:', error);
      });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {session && session.user ? <Nav session={session} key={session.user.id} /> : <Auth />}
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
