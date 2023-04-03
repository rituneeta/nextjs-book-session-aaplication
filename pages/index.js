import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import Button from "@material-ui/core/Button";
import Google from "@/public/google-icon.svg";
import MeetingRoomDetails from '@/components/meetingRoomDetails/meetingRoomDetails';

export default function HomePage() {
  const { status } = useSession();

  if (status === 'loading') return <h1 style={{ textAlign: "center" }}> loading... please wait</h1>;
  if (status === 'authenticated') return <MeetingRoomDetails />;

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <Button variant="outlined" onClick={() => signIn('google')}>
        <Image src={Google} alt="react logo" style={{ height: "30px", width: "50px" }} />
        Sign In with Google
      </Button>
    </div>
  )
}