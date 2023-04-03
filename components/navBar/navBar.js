import React from "react";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router'
import Button from "@material-ui/core/Button";

function NavBar() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div style={{ backgroundColor: "#f50057", height: "50px" }}>
      {status === 'authenticated' && (
        <>
          {router.pathname == "/bookSlot" &&
            <Button
              style={{ top: "10px", left: "50px", position: "absolute" }}
              variant="contained"
              size="small" onClick={() => router.push('/')}>
              Back
            </Button>
          }
          <Button
            style={{ top: "10px", right: "50px", position: "absolute" }}
            variant="contained"
            size="small"
            onClick={() => {
              localStorage.clear("session-mentor");
              localStorage.clear("session-description");
              signOut()
            }}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default NavBar;