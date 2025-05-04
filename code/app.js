const app = Vue.createApp({
  data() { 
    return {
        debugData: {
            debug: true,
            ticks: 0,
            tickInterval: 1000
        },
        
        // Game statics
        plantResearchCosts: [
            {name: "Solar", cost: 10000},
            {name: "Wind", cost: 20000},
            {name: "Coal", cost: 30000},
            {name: "Nuclear", cost: 50000}
        ],
        powerPlantTypes: [
            { name: 'Solar', cost: 100000, production: 1000, maintenanceCost: 100 },
            { name: 'Wind', cost: 200000, production: 2000, maintenanceCost: 200 },
            { name: 'Coal', cost: 300000, production: 3000, maintenanceCost: 300 },
            { name: 'Nuclear', cost: 500000, production: 5000, maintenanceCost: 500 }
        ],
        researchFacilities: [
            { name: 'Solar Research Building', cost: 100000, production: 1000, maintenanceCost: 100 },
            { name: 'Wind Research Building', cost: 200000, production: 2000, maintenanceCost: 200 },
            { name: 'Coal Research Building', cost: 300000, production: 3000, maintenanceCost: 300 },
            { name: 'Nuclear Research Building', cost: 500000, production: 5000, maintenanceCost: 500 }
        ],
        // Game Variables
        companyData: {
            name: 'Your Company',
            balance: 1000000
        },
        powerPlants: [
            {name: "Solar", number: 0},
            {name: "Wind", number: 0},
            {name: "Coal", number: 0},
            {name: "Nuclear", number: 0}
        ],
        plantResarchLevels: [
            {name: "Solar", level: 0},
            {name: "Wind", level: 0},
            {name: "Coal", level: 0},
            {name: "Nuclear", level: 0}
        ],
        researchBuildings: [
            { name: 'Solar Research Facility', number: 0},
            { name: 'Wind Research Facility', number: 0},
            { name: 'Coal Research Facility', number: 0},
            { name: 'Nuclear Research Facility', number: 0}
        ],

    }},
    created() {
        this.log('App created');
        this.startTicking();
    },
    methods: {
        startTicking() {
            setInterval(() => {
                this.gameLoop();
                this.debugData.ticks++;
            }, 1000); // Update every 1000 milliseconds
        },
        gameLoop() {

            
            this.saveData();
        },
        // 
        saveData() {
            localStorage.setItem('appData', JSON.stringify(this.$data));
        },
        loadData() {
            const data = JSON.parse(localStorage.getItem('appData'));
            if (data) {
                Object.assign(this.$data, data);
            }
        },
        clearData() {
            localStorage.removeItem('appData');
            this.companyData.balance = 1000000;
            this.powerPlants.forEach(plant => plant.number = 0);
            this.plantResarchLevels.forEach(plant => plant.level = 0); 
            this.researchBuildings.forEach(building => building.number = 0);

            this.debug_Data.ticks = 0;
        },
        //
        log(msg) {
            if (this.debugData.debug) {
                console.log(msg);
            }
        }
    },
    mounted() {
        this.log('App mounted');
    },
   
});      
app.mount('#app');