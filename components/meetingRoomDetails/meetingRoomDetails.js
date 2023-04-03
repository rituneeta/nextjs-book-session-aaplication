import React, { useState } from "react";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const MeetingRoomDetails = () => {
  const history = useRouter();
  const { data } = useSession();

  const [sessionDesc, setSessionDesc] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const rooms = [
    {
      value: null,
      label: "Please Select the Mentor",
    },
    {
      value: "Ananya - Software Developer",
      label: "Ananya - Software Developer",
    },
    {
      value: "Rohit - Backend Developer",
      label: "Rohit - Backend Developer",
    },
    {
      value: "Sanaya - PHP Developer",
      label: "Sanaya - PHP Developer",
    },
  ];

  return (
    <div className={"meetingRoom"}>
      <h2 style={{ marginBottom: "40px" }}>Book a Session </h2>

      <TextField
        id="mentor"
        select
        label={<div>Select the Mentors <span style={{ color: "Red", fontSize: "20px" }}>*</span></div>}
        onChange={(e) => {
          if (e.target.value === "Please Select the Mentors") {
            setSelectedMentor(null)
          } else {
            localStorage.setItem('session-mentor', e.target.value);
            setSelectedMentor(e.target.value)
          }
        }}
        SelectProps={{ native: true }}
        variant="outlined"
        style={{ margin: 8 }}>
        {rooms.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </TextField>

      <TextField id="username" label="Name" style={{ margin: 8 }} variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} value={data?.user?.name} disabled />

      <TextField
        id="session-descr"
        label={<div>Session Description <span style={{ color: "Red", fontSize: "20px" }}>*</span></div>}
        style={{ margin: 8 }}
        placeholder="Enter session description"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => {
          setSessionDesc(e.target.value)
          localStorage.setItem('session-description', e.target.value);
        }}
        variant="outlined"
      />
      <br />
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        disabled={!(selectedMentor && sessionDesc)}
        onClick={() => history.push("/bookSlot")}>
        Next
      </Button>
    </div>
  );
};

export default MeetingRoomDetails;