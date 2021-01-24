import { GetDictItemsByUcode, GetQuotaClassifyList, GetQuotaItemList } from '@/api'
import { eventBus } from '@/utils/eventBus'
import store from '@/store'
export const all = [
    [
        {
            title: "设施设备编号",
            value: "KeyNo",
            props: { disabled: true }
        },
        {
            title: "设施设备名称",
            value: "SSSBMC",
            required: true
        },
        {
            title: "规格型号",
            value: "GGXH",
            required: true
        },
        {
            title: "计量单位",
            value: "JLDW",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            async task() {
                const list = await GetDictItemsByUcode({ ucode: 10060002 })
                this.props.options = list.map(item => ({ value: item.uname }))
            }
        },
        {
            title: "数量",
            value: "SL",
            required: true
        },
        {
            title: "单位",
            value: "DW",
            required: true
        },
        {
            title: "备注",
            value: "BZ",
            type: "elTextArea"
        }
    ],
    [
        {
            title: "房屋编号",
            value: "GTBH",
            props: { disabled: true }
        },
        {
            title: "名称",
            value: "GTMC",
            required: true
        },
        {
            title: "结构类型",
            value: "JGLX",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            callback(v) {
                const i = all[1][2].props.options.find(item => { return item.label === v })
                eventBus.$emit('getDEMC', i.value)
            },
            async task() {
                const { list } = await GetQuotaClassifyList({ LocationId: store.state.zxss.town, ClassifyName: '农村小型专项及农副业设施', CurrentPage: 1, PageSize: 200 })
                this.props.options = list.map(item => ({ label: item.o_virtualitemdesc, value: item.o_virtualitemno }))
            }
        },
        {
            title: "定额名称",
            value: "DEMC",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            task() {
                eventBus.$once('getDEMC', async (v) => {
                    const { list } = await GetQuotaItemList({ Virtualitemno: v, CurrentPage: 1, PageSize: 200 })
                    this.props.options = list.map(item => ({ value: item.UNAME }))
                })
            }
        },
        {
            title: "单位",
            value: "YDXZ",
            required: true
        },
        {
            title: "数量",
            value: "YDHDFS",
            required: true
        },
        {
            title: "权属",
            value: "JYMJ",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            async task() {
                const list = await GetDictItemsByUcode({ ucode: 10060001 })
                this.props.options = list.map(item => ({ value: item.uname }))
            }
        },
        {
            title: "备注",
            value: "BZ",
            type: "elTextArea"
        }
    ],
    [
        {
            title: "房屋编号",
            value: "GTBH",
            props: { disabled: true }
        },
        {
            title: "名称",
            value: "GTMC",
            required: true
        },
        {
            title: "结构类型",
            value: "JGLX",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            callback(v) {
                const i = all[2][2].props.options.find(item => { return item.label === v })
                eventBus.$emit('getDEMC', i.value)
            },
            async task() {
                const { list } = await GetQuotaClassifyList({ LocationId: store.state.zxss.town, ClassifyName: '农村小型专项及农副业设施', CurrentPage: 1, PageSize: 200 })
                this.props.options = list.map(item => ({ label: item.o_virtualitemdesc, value: item.o_virtualitemno }))
            }
        },
        {
            title: "定额名称",
            value: "DEMC",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            task() {
                eventBus.$once('getDEMC', async (v) => {
                    const { list } = await GetQuotaItemList({ Virtualitemno: v, CurrentPage: 1, PageSize: 200 })
                    this.props.options = list.map(item => ({ value: item.UNAME }))
                })
            }
        },
        {
            title: "单位",
            value: "YDXZ",
            required: true
        },
        {
            title: "数量",
            value: "YDHDFS",
            required: true
        },
        {
            title: "权属",
            value: "JYMJ",
            required: true,
            type: "selector",
            props: {
                options: []
            },
            async task() {
                const list = await GetDictItemsByUcode({ ucode: 10060001 })
                this.props.options = list.map(item => ({ value: item.uname }))
            }
        },
        {
            title: "备注",
            value: "BZ",
            type: "elTextArea"
        }
    ],
    [
        {
            title: "设备编号",
            value: "SBBH",
            props: { disabled: true }
        },
        {
            title: "名称",
            value: "SBMC",
            required: true
        },
        {
            title: "结构",
            value: "JG",
            required: true
        },
        {
            title: "规格型号",
            value: "GGXH",
            required: true
        },
        {
            title: "单位",
            value: "DW",
            required: true
        },
        {
            title: "数量",
            value: "SL",
            required: true
        },
        {
            title: "购买建成时间",
            value: "GMJCSJ",
            type: "elDatePicker"
        },
        {
            title: "备注",
            value: "BZ",
            "textArea": true
        }
    ],
    [
        {
            title: "存货编号",
            value: "GTBH",
            props: { disabled: true }
        },
        {
            title: "名称",
            value: "GTMC",
            required: true
        },
        {
            title: "规格型号",
            value: "ZDMJ",
            required: true
        },
        {
            title: "单位",
            value: "YDXZ",
            required: true
        },
        {
            title: "数量",
            value: "YDHDFS",
            required: true
        },
        {
            title: "备注",
            value: "BZ",
            "textArea": true
        }
    ]
]