import {Pagination} from 'element-ui'
console.log(Pagination);

Pagination.props.pageSize.default = 5;
Pagination.props.layout.default = 'prev, pager, next, total'
export default Pagination;