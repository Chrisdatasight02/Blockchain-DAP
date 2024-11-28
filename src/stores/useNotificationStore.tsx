import create,  {State} from "zustand";
import produce from "immer";
import { set } from "immer/dist/internal";


interface NotificationStore extends State {
  notification: Array<{
    type: string;
    message: string;
    description?: string;
    txid?: string;
  }>;
  set: (x: any)=> void;
}

const useNotificationstore = create<NotificationStore>((set, _get) =>({
  notifications: [],
  set: (fn)=> set(produce(fn)),
}));

export default useNotificationstore;


