import React from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function TimeSlots(props) {
  const slotList = [...Array(19)].map((val, ind) => {
    return moment(`${10 + Math.floor(ind / 2)}:${ind % 2 === 0 ? "00" : "30"}`,"HH:mm").format("hh:mm a");
  });

  return (
    <>
      <p style={{ textAlign: "center", fontSize: "25px", marginBottom:'30px' }}>
        Please select your preferred slot
      </p>
      <Grid container style={{ justifyContent: "center"}}>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {slotList.map((slot) => (
              <Grid key={slot} item>
                <Button
                  variant={props.slotTime === slot ? "contained" : "outlined"}
                  color={props.slotTime === slot ? "secondary" : undefined}
                  onClick={() => props.setSlotTime(slot)}>
                  {slot}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TimeSlots;