import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message,
  MessageBox,
  Button,
  Menu,
  Submenu,
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
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Table,
  TableColumn,
  Tooltip,
  Loading,
  Drawer,
} from 'element-ui';

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
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
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Drawer);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$Message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
