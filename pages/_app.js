import { SessionProvider } from 'next-auth/react';
import { NotificationContainer } from "react-notifications";
import NavBar from '@/components/navBar/navBar';
import "react-notifications/lib/notifications.css";
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
      <NotificationContainer />
    </SessionProvider>
  )
}