import useNotificationstore from "../stores/useNotificationStore";

export function notify(newNotification: {
  type?: string;
  message: string;
  description?: string;
  txid?: string;

}){
  const {notifications, set: setNotificationStore} = 
  useNotificationstore.getState();

  setNotificationStore((state: {notifications: any[]}) => {
    state.notifications = [
      ...notifications, {type: "success", ...newNotification},
    ]
  })
}