import {Input,DatePicker} from 'element-ui';
import { deepClone } from '@/utils';
console.log(Input);
console.log(DatePicker);

const Textarea = deepClone(Input);

Textarea.props.type.default = 'textarea';
Textarea.name = 'ElTextArea';
console.log(Textarea);
export default Textarea;