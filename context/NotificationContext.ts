import { createContext } from 'react';

const NotificationContext = createContext<{
  expoPushToken: string | undefined;
  setExpoPushToken:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}>({
  expoPushToken: undefined,
  setExpoPushToken: undefined,
});

export default NotificationContext;
