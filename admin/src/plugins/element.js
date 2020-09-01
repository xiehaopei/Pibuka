import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message,
  MessageBox,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Aside,
  Main,
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Dialog,
  Upload,
  Tag,
} from 'element-ui';

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Avatar);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Tag);

Vue.prototype.$Message = Message;
Vue.prototype.$comfirm = MessageBox.comfirm;
