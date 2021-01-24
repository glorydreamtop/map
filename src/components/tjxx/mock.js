export default [
    {
        title: {
            text: "土地占比",
            left: 'center'
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "horizontal",
            bottom: 0,
        },
        series: [
            {
                name: "土地占比",
                type: "pie",
                radius: "50%",
                data: [
                    { value: 1048, name: "耕地" },
                    { value: 735, name: "园地" },
                    { value: 580, name: "林地" },
                    { value: 484, name: "其他土地" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    },
    {
        title: {
            text: "人口统计",
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
    },
    {
        title: {
            text: '线性趋势'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            bottom: 0
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    },
    {
        silent: true,
        series: [{
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: null,
            emphasis: {
                focus: 'ancestor'
            },
            data: [{
                value: 8,
                children: [{
                    value: 4,
                    children: [{
                        value: 2
                    }, {
                        value: 1
                    }, {
                        value: 1
                    }, {
                        value: 0.5
                    }]
                }, {
                    value: 2
                }]
            }, {
                value: 4,
                children: [{
                    children: [{
                        value: 2
                    }]
                }]
            }, {
                value: 4,
                children: [{
                    children: [{
                        value: 2
                    }]
                }]
            }, {
                value: 3,
                children: [{
                    children: [{
                        value: 1
                    }]
                }]
            }],
            label: {
                color: '#000',
                textBorderColor: '#fff',
                textBorderWidth: 2,
                formatter: function (param) {
                    var depth = param.treePathInfo.length;
                    if (depth === 2) {
                        return 'radial';
                    }
                    else if (depth === 3) {
                        return 'tangential';
                    }
                    else if (depth === 4) {
                        return '0';
                    }
                }
            },
            levels: [{}, {
                itemStyle: {
                    color: '#CD4949'
                },
                label: {
                    rotate: 'radial'
                }
            }, {
                itemStyle: {
                    color: '#F47251'
                },
                label: {
                    rotate: 'tangential'
                }
            }, {
                itemStyle: {
                    color: '#FFC75F'
                },
                label: {
                    rotate: 0
                }
            }]
        }]
    }
]