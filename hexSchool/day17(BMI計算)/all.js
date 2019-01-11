var app = new Vue({
    el: '#app',
    data: {
        inpHeight: '',
        inpWeight: '',
        list: [],
    },
    computed: {
        BMI() {
            const vm = this;
            if(vm.inpHeight == '' || vm.inpWeight == '') {
                return 0.00;
            }
            let bmi = vm.inpWeight / ((vm.inpHeight / 100) * (vm.inpHeight / 100))
            return bmi.toFixed(2);
        }
    },
    methods: {
        storeBMI() {
            const vm = this;
            let bmiStandard;
            let bmi = vm.BMI;
            if (vm.BMI < 18.5) {
                bmiStandard = ["color0", "體重過輕"];
            } else if (vm.BMI >= 18.5 && vm.BMI < 24) {
                bmiStandard = ["color1", "正常範圍"];
            } else if (vm.BMI >= 24 && vm.BMI < 27) {
                bmiStandard = ["color2", "過重"];
            } else if (vm.BMI >= 27 && vm.BMI < 30) {
                bmiStandard = ["color3", "輕度肥胖"];
            } else if (vm.BMI >= 30 && vm.BMI < 35) {
                bmiStandard = ["color4", "中度肥胖"];
            } else {
                bmiStandard = ["color5", "重度肥胖"];
            }
            let BmiItem = {
                height:vm.inpHeight,
                weight:vm.inpWeight,
                BMInum:bmi,
                bgColor:bmiStandard[0],
                range:bmiStandard[1],
            };
            vm.list.push(BmiItem);
            localStorage.localList = JSON.stringify(vm.list);
        },
        removeList(index) {
            const vm = this;
            vm.list.splice(index,1);
            localStorage.localList = JSON.stringify(vm.list);
        }
    },
    created() {
        const vm = this;
        vm.list = JSON.parse(localStorage.localList);

    },
})