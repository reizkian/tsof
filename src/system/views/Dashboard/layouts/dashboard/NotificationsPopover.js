import axios from "axios";
import faker from "faker";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setUnReadNotifications } from "system/redux/reducer/notifications";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { set, sub, formatDistanceToNow } from "date-fns";
import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
// utils
import { mockImgAvatar } from "../../utils/mockImages";
// components
import Scrollbar from "../../components/Scrollbar";
import MenuPopover from "../../components/MenuPopover";

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: "Registrasi Kelas",
    description: "berhasil mendaftar sebagai Pembina pada kelas Murid Kristus",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    description: "answered to your comment on the Minimal",
    avatar: mockImgAvatar(2),
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 7, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: "You have new message",
    description: "5 unread messages",
    avatar: null,
    type: "chat_message",
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "You have new mail",
    description: "sent from Guido Padberg",
    avatar: null,
    type: "mail",
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );
  return title;
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

function NotificationItem({ notification }) {
  const title = renderContent(notification);
  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(parseInt(notification.timeStamp)))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover({ account }) {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { unReadNotifications } = useSelector((state) => state.notifications);
  const [isMounted, SetIsMounted] = useState(false);
  const [notifications, setNotifications] = useState(undefined);
  const [totalUnRead, setTotalUnRead] = useState(undefined);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
    // deep copy redux notification state, then modify
    let readedNotifications = JSON.parse(JSON.stringify(unReadNotifications));
    for (let eachNotification in readedNotifications) {
      readedNotifications[eachNotification]["isUnRead"] = false;
    }
    // update redux notification state
    dispatch(setUnReadNotifications(readedNotifications));
    // update notification database isUnRead false
    updateIsReadedNotifications(readedNotifications);
    setTotalUnRead(0);
  };

  useEffect(() => {
    // console.log("notification object", unReadNotifications);
    // console.log("notification array", notifications);
    // console.log("total unread", totalUnRead);
    // console.log("---------------------------------------");

    if (!isMounted && unReadNotifications !== null) {
      console.log("trigger set notifications");
      setNotifications(Object.values(unReadNotifications));
      if (notifications !== undefined) {
        console.log("trigger set total unread");
        setTotalUnRead(
          notifications.filter((item) => item.isUnRead === true).length
        );
        SetIsMounted(false)
      }
    }

  }, [unReadNotifications, isMounted,totalUnRead]);

  function updateIsReadedNotifications(payloadData) {
    axios.post(`notifications/setread/${account._id}`, payloadData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <>
      {notifications === undefined ? (
        <CircularProgress />
      ) : (
        <IconButton
          ref={anchorRef}
          size="large"
          color={open ? "primary" : "default"}
          onClick={handleOpen}
          sx={{
            ...(open && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.focusOpacity
                ),
            }),
          }}
        >
          <Badge badgeContent={totalUnRead} color="error">
            <Icon icon={bellFill} width={20} height={20} />
          </Badge>
        </IconButton>
      )}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifikasi</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Anda memiliki {totalUnRead === undefined ? "0" : totalUnRead}{" "}
              notifikasi yang belum dibaca
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Tandai sudah dibaca">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          {notifications === undefined ? (
            <LinearProgress />
          ) : (
            <>
              <List disablePadding>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </List>
            </>
          )}
        </Scrollbar>

        {/* <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            Lihat Semua
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}
