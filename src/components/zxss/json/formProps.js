import { GetDictItemsByUcode } from '@/api'
export const all = [
    [
        {
            title: "专项名称",
            value: "ZXMC",
            required: true,
            props: {
                options: [{value:'水库淹没区'}, {value:'水库影响区'}, {value:'枢纽工程建设区'}]
            },
            type:'selector'
        },
        {
            title: "项目名称",
            value: "XMMC",
            required: true
        },
        {
            title: "权属单位",
            value: "QSDW",
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
            title: "建成年月",
            value: "JCNY",
            "type": "elDatePicker",
            required: true
        },
        {
            title: "规模",
            value: "GM"
        },
        {
            title: "年产值",
            value: "NCZ",
            unit: "万元",
            rule:'number'
        },
        {
            title: "年利润",
            value: "NLR",
            unit: "万元",
            rule:'number'
        },
        {
            title: "税金",
            value: "SJ",
            unit: "万元",
            rule:'number'
        },
        {
            title: "高程分布",
            value: "GCFB"
        },
        {
            title: "固资投资",
            value: "GDZCTZ",
            unit: "万元",
            rule:'number'
        },
        {
            title: "从业人员",
            value: "CYRY",
            unit: "人",
            rule:'number'
        },
        {
            title: "其他",
            value: "QT"
        },
        {
            title: "被调查人",
            value: "BDCR"
        },
        {
            title: "工程类型",
            value: "GCLX"
        },
        {
            title: "高程范围1",
            value: "GCFW1",
            unit: "m"
        },
        {
            title: "高程范围2",
            value: "GCFW2",
            unit: "m"
        },
        {
            title: "备注",
            value: "BZ",
            "type": "elTextArea"
        }
    ],
    [
        {
            title: "专项名称",
            value: "ZXMC",
            required: true,
            props: {
                options: [{value:'水库淹没区'}, {value:'水库影响区'}, {value:'枢纽工程建设区'}]
            },
            type:'selector'
        },
        {
            title: "个体名称",
            value: "GTMC",
            required: true
        },
        {
            title: "占地面积",
            value: "ZDMJ",
            unit: "㎡",
            rule:'number'
        },
        {
            title: "用地性质",
            value: "YDXZ"
        },
        {
            title: "用地取得方式",
            value: "YDHDFS"
        },
        {
            title: "经营面积",
            value: "JYMJ",
            unit: "㎡",
            rule:'number'
        },
        {
            title: "主要产品品种",
            value: "ZYCPPZ"
        },
        {
            title: "年产值",
            value: "NCZ",
            unit: "万元",
            rule:'number'
        },
        {
            title: "年利润",
            value: "NLY",
            unit: "万元",
            rule:'number'
        },
        {
            title: "税金",
            value: "SJ",
            unit: "万元",
            rule:'number'
        },
        {
            title: "被调查人",
            value: "BDCR"
        },
        {
            title: "工程类型",
            value: "GCLX"
        },
        {
            title: "高程范围1",
            value: "GCFW1"
        },
        {
            title: "高程范围2",
            value: "GCFW2"
        },
        {
            title: "备注",
            value: "BZ",
            "type": "elTextArea"
        }
    ]
]