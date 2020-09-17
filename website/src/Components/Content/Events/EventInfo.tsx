import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import React, { Fragment } from "react";
import { EventSchema } from "../../../../@Types";

declare interface EventInfoProps {
  event: EventSchema;
  currentTimeMilliseconds: number;
  classes: any;
}

const EventInfo: React.FunctionComponent<EventInfoProps> = ({
  event,
  currentTimeMilliseconds,
  classes,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.brandingColor}>
          <CalendarTodayIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`[${event.type}]: ${event.eventName}`}
        secondary={
          <Fragment>
            <Typography variant="body1" component="span">
              {event.startTime.toLocaleTimeString()} -{" "}
              {event.startTime.toLocaleDateString() ===
              event.endTime.toLocaleDateString()
                ? event.endTime.toLocaleTimeString()
                : event.endTime.toLocaleString()}{" "}
              {event.location ? "|" : ""} {event.location}
            </Typography>
            <br />
            {event.eventDescription}
          </Fragment>
        }
      />
      {event.joinLink &&
        event.startTime.valueOf() - 60000 * 10 <= currentTimeMilliseconds &&
        event.endTime.valueOf() >= currentTimeMilliseconds && (
          <ListItemSecondaryAction>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                window.open(event.joinLink, "_blank");
              }}
            >
              Join Virtually!
            </Button>
          </ListItemSecondaryAction>
        )}
      {/** TODO: Add Speakers, Custom Icons, and Custom Colors **/}
    </ListItem>
  );
};

export default EventInfo;
