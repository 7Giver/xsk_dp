import Vue from 'vue'
import infiniteScroll from "vue-infinite-scroll";
import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Menu,
  MenuItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar,
  Dialog,
  Form,
  FormItem,
  Input,
  InputNumber,
  Button,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Row,
  Col,
  Popover,
  Table,
  TableColumn,
  Select,
  Option,
  Upload,
  Progress,
  Spinner,
  DatePicker,
  TimePicker,
  Cascader ,
  Tooltip
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Scrollbar);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Popover);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Option);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Cascader);
Vue.use(Tooltip);

Vue.use(Loading.directive);

Vue.use(infiniteScroll);
