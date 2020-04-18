<template>
    <div id="order-statistics-component">
        <div class="top-title bg-white">
            <span>订单统计</span>
        </div>
        <div>
            <div>
                <select v-model="time_category">
                    <option value="month" selected>本月</option>
                    <option value="last month">上月</option>
                    <option value="year">本年</option>
                    <option value="last year">上年</option>
                </select>
            </div>
            <div id="order-echarts">

            </div>
        </div>
    </div>
</template>

<script>
    import {urlOrderQuery} from "../../../../utils/urls";

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
    const count = (list, unit, category) => {
        console.log(`start count: ${unit}, ${category}`)
        let result = 0, unit_now;
        list.forEach((item) => {
            switch (category) {
                case 'month':
                    unit_now = new Date(item.update_time).getDate();
                    console.log(`day_now: ${unit_now}`);
                    if(unit_now == unit) {
                        result++;
                    }
                    break;
                case 'year':
                    unit_now = Number(new Date(item.update_time).getMonth()) + 1;
                    console.log(`month now: ${unit_now}`)
                    if(unit_now == unit) {
                        result++;
                    }
                    break;
                case 'last month':
                    unit_now = Number(new Date(item.update_time).getDate());
                    if(unit_now == unit) {
                        result++;
                    }
                    break;
                case 'last year':
                    unit_now = Number(new Date(item.update_time).getMonth()) + 1;
                    if(unit_now == unit) {
                        result++;
                    }
            }
        })
        return result;
    }
    export default {
        name: "OrderStatisticsComponent",
        data() {
            return {
                query_time: this.$route.query.query_time == undefined ? null : this.$route.query.query_time,
                time_category: this.$route.query.time_category == undefined ? null : this.$route.query.time_category,
                buy_in_or_sell: this.$route.query.buy_in_or_sell == undefined ? 1 : Number(this.$route.query.buy_in_or_sell),

                chart_title: null,

                list: [],
                x_data: [],
                y_data: [],
                chart_data: [],
                show_chart: false,
            }
        },
        methods: {
            getMethod(url, params) {
                this.$axios
                    .get(url, params)
                    .then(response => {
                        const data = response.data.data;
                        if(data) {
                            console.log(`order statistics: ${JSON.stringify(data)}`);
                            this.list = data;
                            this.initiateChartData();
                            this.show_chart = true;
                            this.initiateChart();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            fetchList(query_time, time_category, buy_in_or_sell) {
                const params = {
                    params: {
                        query_time: query_time,
                        time_category: time_category,
                        buy_in_or_sell: buy_in_or_sell
                    }
                }
                this.getMethod(urlOrderQuery, params);
            },
            routeToFetch(query) {
                this.query_time = query.query_time;
                this.time_category = query.time_category;
                this.buy_in_or_sell = Number(query.buy_in_or_sell);
                this.chart_title = judgeTitle(this.time_category);
                this.fetchList(this.query_time, this.time_category, this.buy_in_or_sell);
            },
            initiateChart() {
                console.log(`initiate chart`);
                const echart_element = document.getElementById('order-echarts');
                console.log(`echart element: ${echart_element}`);
                let my_chart = this.$echarts.init(echart_element);
                my_chart.setOption({
                    title: { text:  this.chart_title},
                    tooltip: {},
                    xAxis: {
                        data: this.x_data
                    },
                    yAxis: {
                        data: this.y_data
                    },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: this.chart_data
                    }]
                });
            },
            initiateChartData() {
                console.log('initiate chart data');
                let x_data = [], y_data = [0,1,2,3,4], chart_data = [], month, day;
                switch (this.time_category) {
                    case 'month':
                        day = Number(new Date(this.query_time).getDate());
                        console.log(`day: ${day}`)
                        for(let i = 0;i < day;i++) {
                            x_data[i] = `${i + 1}日`;
                            chart_data[i] = count(this.list, i + 1, this.time_category);
                        }
                        break;
                    case 'year':
                        month = Number(new Date(this.query_time).getMonth()) + 1;
                        console.log(`month: ${month}`);
                        for(let i = 0;i < month;i++) {
                            x_data[i] = `${i + 1}月`;
                            chart_data[i] = count(this.list, i + 1, this.time_category);
                        }
                        break;
                    case 'last month':
                        month = (Number(new Date(this.query_time).getMonth()) + 1) == 1 ? 12 : Number(new Date(this.query_time).getMonth());
                        console.log(`month: ${month}`);
                        for(let i = 0;i < 31;i++) {
                            x_data[i] = `${i + 1}月`;
                            chart_data[i] = count(this.list, i + 1, this.time_category);
                        }
                        break;
                    case 'last year':
                        for(let i = 0;i < 12;i++) {
                            x_data[i] = `${i + 1}月`;
                            chart_data[i] = count(this.list, i + 1, this.time_category);
                        }
                }
                this.x_data = x_data;
                this.y_data = y_data;
                this.chart_data = chart_data;
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
                this.$router.push({query: query}).catch(() => {});
            }
        },
        mounted() {
            const query = this.$route.query;
            this.routeToFetch(query);
            // this.initiateChart();
        }
    }
</script>

<style scoped>
    #order-statistics-component {
        margin: .6rem 1rem;
    }
    .top-title {
        display: inline-block;
        padding: .6rem 1rem;
    }
    #order-echarts {
        width: 600px;
        height: 600px;
    }
</style>