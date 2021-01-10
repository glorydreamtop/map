import {Input,DatePicker} from 'element-ui';
import { deepClone } from '@/utils';

const Textarea = deepClone(Input);
Textarea.props.type.default = 'textarea';
Textarea.name = 'ElTextArea';
export default Textarea;