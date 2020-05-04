const categoryMap = (val) => {
    switch (val) {
        case 0:
            return '所有';
        case 1:
            return '机械设备';
        case 2:
            return '五金工具';
        case 3:
            return '家具用品';
        case 4:
            return '交通运输';
        case 5:
            return '建筑建材';
        case 6:
            return '仪器仪表';
        case 7:
            return '照明设备';
        case 8:
            return '安防设备';
        default:
            return '空';
    }
}

export default categoryMap;