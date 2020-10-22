import axios from "axios"
import { Message } from "element-ui";
declare module "vue/types/vue" {
  interface Vue {
    $http: axios;
    $message: Message;
  }
}