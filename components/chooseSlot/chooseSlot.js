import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "@material-ui/core/Button";
import { NotificationManager } from "react-notifications";
import TimeSlots from "./timeSlots";

const ChooseSlot = () => {
  const { data } = useSession();
  const [date, setDate] = useState(new Date());
  const [slotTime, setSlotTime] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const bookAppointment = () => {
    const userName = data?.user?.name;
    const selectedMentor = localStorage.getItem("session-mentor");
    const sessionDesc = localStorage.getItem("session-description");
    setShowLoader(true)
    fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        email: "rituneeta@gmail.com",
        subject: "Trial Session Booked Successfully",
        message: `
          <div style={{fontSize:"20px",lineHeight:"32px"}}>
            <div> Dear ${userName},</div>
            <div>Your Trial Session of ${sessionDesc} with ${selectedMentor} at ${slotTime}  has been successfully booked</div>
            <div>Thanks, Regards</div>
            <div>Neeta</div>
          </div>`
      }),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }).then((res) => {
      setShowLoader(false)
      if (!res.ok) throw new Error("Failed to send message");
        NotificationManager.success("Succesfully Book a Session !", "BookMeeting", 2000);
    }).catch(error => {
      setShowLoader(false)
      NotificationManager.error("Error to Book a Session ", "BookMeeting");
    })
  };

  return (
    <>
      <Calendar style={{ justifyContent: "center" }} value={date} minDate={new Date()} onChange={(val) => setDate(val)}/>
      <p style={{ textAlign: "center" }}>{moment(date).format("dddd, Do MMMM")}</p>
      <br />
      <TimeSlots {...{ slotTime, setSlotTime }} />
      <br />
      <Button
        onClick={bookAppointment}
        variant="contained"
        color="secondary"
        loading={true}
        disabled={!(date && slotTime)}
        style={{ margin: "10px 40% 30px 40%", width: "20%" }}>
        {showLoader ? "Loading..." : "BOOK APPOINTMENT"}
      </Button>
    </>
  );
};

export default ChooseSlot;
