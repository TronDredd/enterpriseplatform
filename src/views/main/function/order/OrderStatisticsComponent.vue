<template>
    <div>
        <div id="order-statistics-component" class="bg-white d-flex flex-column">
            <ListHeader :list-name="list_name" :block_color="block_color"></ListHeader>
            <div class="d-flex flex-row-reverse options-box">
                <div class="select-box margin-left-8">
                    <!--金额统计图-->
                    <select v-model="chart_category">
                        <option value="order_number" selected>订单数量统计图</option>
                        <option value="order_money">订单金额统计图</option>
                    </select>
                </div>
                <div class="select-box">
                    <select v-model="time_category">
                        <option value="month" selected>本月</option>
                        <option value="last month">上月</option>
                        <option value="year">本年</option>
                        <option value="last year">上年</option>
                    </select>
                </div>
            </div>
            <div id="order-echarts">

            </div>
        </div>
    </div>
</template>

<script>
    import {urlOrderQuery} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";

    const chart_titles = [
        '本月订单数统计图',
        '上月订单数统计图',
        '本年订单数统计图',
        '上年订单数统计图'
    ];
    const judgeTitle = (str) => {
        let result = '';
        switch (str) {
            case 'month':
                result = chart_titles[0];
                break;
            case 'last month':
                result = chart_titles[1];
                break;
            case 'year':
                result = chart_titles[2];
                break;
            default:
                // last year
                result = chart_titles[3];
        }
        return result;
    };
    export default {
        name: "OrderStatisticsComponent",
        components: {ListHeader},
        data() {
            return {
                query_time: this.$route.query.query_time == undefined ? null : this.$route.query.query_time,
                time_category: this.$route.query.time_category == undefined ? null : this.$route.query.time_category,

                chart_category: this.$route.query.chart_category == undefined ? 'order_number' : this.$route.query.chart_category,
                chart_title: null,

                buy_list: [],
                sell_list: [],
                x_data: [],
                y_data: [],
                sell_chart_number: [],
                buy_chart_number: [],
                sell_chart_data: [],
                buy_chart_data: [],
                income_chart_data: [],
                expense_chart_data: [],
                show_chart: false,
            }
        },
        methods: {
            getMethod(url, params) {
                this.$axios
                    .get(url, params)
                    .then(response => {
                        const buy_data = response.data.buy_data;
                        const sell_data = response.data.sell_data;
                        if(buy_data && sell_data) {
                            console.log(`order statistics: ${JSON.stringify(buy_data)}, ${JSON.stringify(sell_data)}`);
                            this.buy_list = buy_data;
                            this.sell_list = sell_data;
                            if(this.chart_category == 'order_number') {
                                this.initiateChartData();
                            } else {
                                this.initiateChartMoneyData();
                            }
                            this.show_chart = true;
                            this.initiateChart();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            fetchList(query_time, time_category) {
                const params = {
                    params: {
                        query_time: query_time,
                        time_category: time_category
                    }
                }
                this.getMethod(urlOrderQuery, params);
            },
            routeToFetch(query) {
                this.query_time = query.query_time;
                this.time_category = query.time_category;
                this.chart_category = query.chart_category;
                this.chart_title = judgeTitle(this.time_category);
                this.fetchList(this.query_time, this.time_category);
            },
            initiateChart() {
                console.log(`initiate chart`);
                const echart_element = document.getElementById('order-echarts');
                let my_chart = this.$echarts.init(echart_element);
                let series = [];
                if(this.chart_category === 'order_number') {
                    series = [{
                        name: '卖出订单数量',
                        type: 'bar',
                        data: this.sell_chart_number
                    }, {
                        name: '买进订单数量',
                        type: 'bar',
                        data: this.buy_chart_number
                    }];
                } else {
                    series = [{
                        name: '卖出订单金额',
                        type: 'bar',
                        data: this.sell_chart_data
                    }, {
                        name: '买进订单金额',
                        type: 'bar',
                        data: this.buy_chart_data
                    }, {
                        name: '净收入',
                        type: 'bar',
                        data: this.income_chart_data
                    },{
                        name: '净支出',
                        type: 'bar',
                        data: this.expense_chart_data
                    }];
                }
                //统计图配置项
                const options = {
                    title: { text:  this.chart_title},
                    tooltip: {},
                    toolbox: {
                        show: true,
                        itemSize: 22,
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            }
                        }
                    },
                    legend: {//图例
                        x: 'left',
                        top: "6%",
                    },
                    xAxis: {
                        type: "category",
                        data: this.x_data,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        data: this.y_data,
                        axisTick: {
                            alignWithLabel: true
                        },
                        //从原点开始
                        boundaryGap: false,
                        //分隔线
                        splitLine: {
                            show: true
                        }
                    },
                    series: series
                };
                my_chart.setOption(options);
            },
            initiateChartData() {
                console.log('initiate chart data');
                let x_data = [], y_data = [], count_max = 0, sell_chart_data = [], buy_chart_data = [], month, day, i_day = 0, i_month = 0;
                switch (this.time_category) {
                    case 'month':
                        day = this.getDateNumber(this.query_time);
                        console.log(`day: ${day}`);
                        //创建指定长度的数组 day 1开始
                        buy_chart_data = new Array(day).fill(0);
                        sell_chart_data = new Array(day).fill(0);
                        for(let i = 0; i < day;i++) {
                            x_data[i] = `${i + 1}日`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_day = this.getDateNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_day - 1]++;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_day = this.getDateNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_day - 1]++;
                        }
                        console.log(sell_chart_data);
                        break;
                    case 'year':
                        // month 1开始
                        month = this.getMonthNumber(this.query_time) + 1;
                        console.log(`month: ${month}`);
                        buy_chart_data = new Array(month).fill(0);
                        sell_chart_data = new Array(month).fill(0);
                        for(let i = 0; i < month;i++) {
                            x_data[i] = `${i + 1}月`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_month = this.getMonthNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_month]++;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_month = this.getMonthNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_month]++;
                        }
                        break;
                    case 'last month':
                        month = (this.getMonthNumber(this.query_time) + 1) == 1 ? 12 : this.getMonthNumber(this.query_time) + 1;
                        console.log(`month: ${month}`);
                        buy_chart_data = new Array(31).fill(0);
                        sell_chart_data = new Array(31).fill(0);
                        for(let i = 0; i < 31;i++) {
                            x_data[i] = `${i + 1}日`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_day = this.getDateNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_day - 1]++;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_day = this.getDateNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_day - 1]++;
                        }
                        break;
                    case 'last year':
                        buy_chart_data = new Array(month).fill(0);
                        sell_chart_data = new Array(month).fill(0);
                        for(let i = 0; i < 12;i++) {
                            x_data[i] = `${i + 1}月`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_month = this.getMonthNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_month - 1]++;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_month = this.getMonthNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_month - 1]++;
                        }
                }
                count_max = Math.max(...buy_chart_data, ...sell_chart_data, 4);
                for(let i = 0;i <= count_max;i++) {
                    y_data[i] = i;
                }
                this.x_data = x_data;
                this.y_data = y_data;
                this.sell_chart_number = sell_chart_data;
                this.buy_chart_number = buy_chart_data;
            },
            initiateChartMoneyData() {
                console.log('initiate chart money data');
                let x_data = [], y_data = [], count_max = 0,
                    sell_chart_data = [], buy_chart_data = [], income_chart_data = [], expense_chart_data = [],
                    month, day, i_day = 0, i_month = 0;
                switch (this.time_category) {
                    case 'month':
                        day = this.getDateNumber(this.query_time);
                        console.log(`day: ${day}`);
                        //创建指定长度的数组 day 1开始
                        buy_chart_data = new Array(day).fill(0);
                        sell_chart_data = new Array(day).fill(0);
                        income_chart_data = new Array(day).fill(0);
                        expense_chart_data = new Array(day).fill(0);
                        for(let i = 0; i < day;i++) {
                            x_data[i] = `${i + 1}日`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_day = this.getDateNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_day - 1] = this.buy_list[i].money;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_day = this.getDateNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_day - 1] = this.sell_list[i].money;

                        }
                        console.log(sell_chart_data, buy_chart_data);
                        console.log(`expense_chart_data: ${expense_chart_data}`);
                        break;
                    case 'last month':
                        //创建指定长度的数组 day 1开始
                        buy_chart_data = new Array(31).fill(0);
                        sell_chart_data = new Array(31).fill(0);
                        income_chart_data = new Array(31).fill(0);
                        expense_chart_data = new Array(31).fill(0);
                        for(let i = 0; i < 31;i++) {
                            x_data[i] = `${i + 1}日`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_day = this.getDateNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_day - 1] = this.buy_list[i].money;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_day = this.getDateNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_day - 1] = this.sell_list[i].money;
                        }
                        console.log(sell_chart_data);
                        break;
                    case 'year':
                        month = this.getMonthNumber(this.query_time) + 1;
                        console.log(`month: ${month}`);
                        buy_chart_data = new Array(month).fill(0);
                        sell_chart_data = new Array(month).fill(0);
                        income_chart_data = new Array(month).fill(0);
                        expense_chart_data = new Array(month).fill(0);
                        for(let i = 0; i < month;i++) {
                            x_data[i] = `${i + 1}月`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_month = this.getMonthNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_month] = this.buy_list[i].money;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_month = this.getMonthNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_month] = this.sell_list[i].money;
                        }
                        break;
                    case 'last year':
                        buy_chart_data = new Array(12).fill(0);
                        sell_chart_data = new Array(12).fill(0);
                        income_chart_data = new Array(12).fill(0);
                        expense_chart_data = new Array(12).fill(0);
                        for(let i = 0; i < 12;i++) {
                            x_data[i] = `${i + 1}月`;
                        }
                        for(let i = 0;i < this.buy_list.length;i++) {
                            i_month = this.getMonthNumber(this.buy_list[i].update_time);
                            buy_chart_data[i_month - 1] = this.buy_list[i].money;
                        }
                        for(let i = 0;i < this.sell_list.length;i++) {
                            i_month = this.getMonthNumber(this.sell_list[i].update_time);
                            sell_chart_data[i_month - 1] = this.sell_list[i].money;
                        }
                        break;
                }
                sell_chart_data.forEach((value, index) => {
                    income_chart_data[index] = value - buy_chart_data[index];
                    // expense_chart_data[index] = -1 * income_chart_data[index];
                });
                count_max = Math.max(...buy_chart_data, ...sell_chart_data);
                console.log(count_max);
                for(let i = 0;i <= count_max;i++) {
                    y_data[i] = i;
                }
                this.x_data = x_data;
                this.y_data = y_data;
                this.sell_chart_data = sell_chart_data;
                this.buy_chart_data = buy_chart_data;
                this.income_chart_data = income_chart_data;
                this.expense_chart_data = income_chart_data.map(item => -1 * item);
            },
            getDateNumber(time) {
                return Number(new Date(time).getDate());
            },
            getMonthNumber(time) {
                return Number(new Date(time).getMonth());
            }
        },
        watch: {
            "$route"(to) {
                this.routeToFetch(to.query);
            },
            time_category(newVal) {
                console.log(`time_category has been changed: ${newVal}`);
                const query = Object.assign({}, this.$route.query);
                query.time_category = newVal;
                query.chart_category = this.chart_category;
                this.$router.push({query: query}).catch(() => {});
            },
            chart_category() {
                this.show_chart = false;
                if(this.chart_category === 'order_number') {
                    this.initiateChartData();
                } else {
                    this.initiateChartMoneyData();
                }
                this.initiateChart();
                this.show_chart = true;
            }
        },
        computed: {
            list_name() {
                return '订单统计';
            },
            block_color() {
                return 'block-blue';
            }
        },
        mounted() {
            const query = this.$route.query;
            this.routeToFetch(query);
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/input.css);
    #order-statistics-component {
        padding: 0 1.2rem 1.8rem;
        box-shadow: 10px 10px 30px #d9d9d9,
        -10px -10px 30px #ffffff;
        border-radius:8px;
        max-height: 100%;
        font-size: 1.9rem;
    }
    .options-box {
        width: 60%;
        min-width: 600px;
        margin: 0 auto 1rem auto;
    }
    #order-echarts {
        width: 60%;
        min-width: 600px;
        height: 600px;
        margin: 0 auto;
    }
</style>