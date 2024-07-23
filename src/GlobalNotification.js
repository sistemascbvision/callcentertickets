// import React from 'react';
// import { Snackbar, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNotification } from './NotificacionContext';

// const GlobalNotification = () => {
//   const { notifications, removeNotification } = useNotification();

//   return (
//     <>
//       {notifications.map((notification) => (
//         <Snackbar
//           key={notification.id}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//           open={true}
//           autoHideDuration={6000}
//           onClose={() => removeNotification(notification.id)}
//           message={notification.message}
//           action={
//             <IconButton
//               size="small"
//               aria-label="close"
//               color="inherit"
//               onClick={() => removeNotification(notification.id)}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           }
//         />
//       ))}
//     </>
//   );
// };

// export default GlobalNotification;

import React from 'react';
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNotification } from './NotificacionContext';

const GlobalNotification = () => {
  const { notifications, removeNotification } = useNotification();

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineIcon />;
      case 'error':
        return <ErrorOutlineIcon />;
      case 'info':
      default:
        return <InfoOutlinedIcon />;
    }
  };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          autoHideDuration={6000}
          onClose={() => removeNotification(notification.id)}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={notification.type}
            icon={getAlertIcon(notification.type)}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => removeNotification(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default GlobalNotification;