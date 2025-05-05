const app = Vue.createApp({
    data() {
        return {
            gameData: {
                ticks: 0,
                tickInterval: 1000,
                incomePerMegawatt: 250.00, // Erhält man pro Megawattstunde in Euro
                energyTax: 20.50, // Energiesteuer pro Megawattstunde in Euro
                energyLevies: 47.01, // Umlagen pro Megawattstunde in Euro
                taxRate: 19.00, // Umsatzsteuer in Prozent
                co2Price: 68.00 // CO2 Preis pro Tonne in Euro
            },
            debugData: {
                debug: false
            },

            // Game statics
            plantResearchCosts: [
                { name: "Solar", cost: 10000 },
                { name: "Wind", cost: 20000 },
                { name: "Gas", cost: 30000 },
                { name: "Coal", cost: 40000 },
                { name: "Nuclear", cost: 50000 }
            ],
            powerPlantTypes: [
                { name: 'Solar', cost: 50000, production: 500, maintenanceCost: 50, co2Emission: 0.0 },
                { name: 'Wind', cost: 150000, production: 2000, maintenanceCost: 150, co2Emission: 0.0 },
                { name: 'Gas', cost: 300000, production: 3500, maintenanceCost: 250, co2Emission: 0.450 },
                { name: 'Coal', cost: 400000, production: 4000, maintenanceCost: 400, co2Emission: 0.820 },
                { name: 'Nuclear', cost: 1000000, production: 8000, maintenanceCost: 300, co2Emission: 0.0 }

            ],
            researchFacilities: [
                { name: 'Solar Research Facility', cost: 100000, production: 1000, maintenanceCost: 100 },
                { name: 'Wind Research Facility', cost: 200000, production: 2000, maintenanceCost: 200 },
                { name: 'Gas Research Facility', cost: 300000, production: 3000, maintenanceCost: 300 },
                { name: 'Coal Research Facility', cost: 400000, production: 4000, maintenanceCost: 400 },
                { name: 'Nuclear Research Facility', cost: 500000, production: 5000, maintenanceCost: 500 }
            ],
            // Game Variables
            companyData: {
                name: 'Your Company',
                balance: 10000000,
                totalProduction: 0,
                totalMaintenance: 0,
                totalResearch: 0,
                totalResearchCost: 0,
                totalCO2Emission: 0,
                totalIncome: 0,
                totalTax: 0,
                totalEnergyTax: 0,
                totalEnergyLevies: 0,
                totalCO2Tax: 0,
                totalProfit: 0
            },
            builtPowerPlants: [
                { name: "Solar", number: 0 },
                { name: "Wind", number: 0 },
                { name: "Gas", number: 0 },
                { name: "Coal", number: 0 },
                { name: "Nuclear", number: 0 }
            ],
            plantResarchLevels: [
                { name: "Solar", level: 0 },
                { name: "Wind", level: 0 },
                { name: "Gas", level: 0 },
                { name: "Coal", level: 0 },
                { name: "Nuclear", level: 0 }
            ],
            builtResearchFacilities: [
                { name: 'Solar Research Facility', number: 0 },
                { name: 'Wind Research Facility', number: 0 },
                { name: 'Gas Research Facility', number: 0 },
                { name: 'Coal Research Facility', number: 0 },
                { name: 'Nuclear Research Facility', number: 0 }
            ],
        }
    },
    computed: {
///
    },

    created() {
        this.log('App created');
        this.calculateCompanyData();
        this.startTicking();
    },
    methods: {
        // game
        startTicking() {
            setInterval(() => {
                this.gameLoop();
                this.gameData.ticks++;
            }, this.gameData.tickInterval); // Update every tickInterval milliseconds
        },
        gameLoop() {
            this.calculateCompanyData();

            this.saveData();
        },

        // Calcualte companyData
        calculateCompanyData () {
            this.calculateTotalProduction();
            this.calculateTotalMaintenance();
            this.calculateTotalResearch();
            this.calculateTotalResearchCost();
            this.calculateTotalCO2Emission();
            this.calculateTotalIncome();
            this.calculateTotalTax();
            this.calculateTotalEnergyTax();
            this.calculateTotalEnergyLevies();
            this.calculateTotalCO2Tax();
            this.calculateTotalProfit();
            this.calculateBalance();
        },
        calculateTotalProduction () {
            this.companyData.totalProduction = this.builtPowerPlants.reduce((total, builtPlant) => {
                const plantType = this.getPlantType(builtPlant.name);
                return total + (builtPlant.number * plantType.production);
            }, 0) ;
        },
        calculateTotalMaintenance () {
            this.companyData.totalMaintenance = this.builtPowerPlants.reduce((total, builtPlant) => {
                const plantType = this.getPlantType(builtPlant.name);
                return total + (builtPlant.number * plantType.maintenanceCost);
            }, 0);
        },
        calculateTotalResearch() {
            this.companyData.totalResearch = this.builtResearchFacilities.reduce((total, builtResearch) => {
                const plantType = this.getResearchFacilityType(builtResearch.name);
                return total + (builtResearch.number * plantType.production);
            }, 0) ;
        },
        calculateTotalResearchCost() {
            this.companyData.totalResearchCost = this.builtResearchFacilities.reduce((total, builtResearch) => {
                const plantType = this.getResearchFacilityType(builtResearch.name);
                return total + (builtResearch.number * plantType.maintenanceCost);
            }, 0) ;
        },
        calculateTotalCO2Emission() {
            this.companyData.totalCO2Emission = this.builtPowerPlants.reduce((total, builtPlant) => {
                const plantType = this.getPlantType(builtPlant.name);
                return total + (builtPlant.number * plantType.co2Emission);
            }, 0) ;
        },
        calculateTotalIncome() {
            this.companyData.totalIncome = this.companyData.totalProduction * this.gameData.incomePerMegawatt;
        },
        calculateTotalTax() {
            this.companyData.totalTax =  (this.companyData.totalIncome * this.gameData.taxRate / 100) ;
        },
        calculateTotalEnergyTax () {
            this.companyData.totalEnergyTax = (this.companyData.totalProduction * this.gameData.energyTax) ;
        },
        calculateTotalEnergyLevies () {
            this.companyData.totalEnergyLevies = (this.companyData.totalProduction * this.gameData.energyLevies) ;
        },
        calculateTotalCO2Tax () {
            this.companyData.totalCO2Tax = (this.companyData.totalCO2Emission * this.gameData.co2Price) ;
        },
        calculateTotalProfit () {
            this.companyData.totalProfit = this.companyData.totalIncome - this.companyData.totalMaintenance - this.companyData.totalResearchCost - this.companyData.totalTax - this.companyData.totalEnergyTax - this.companyData.totalEnergyLevies - this.companyData.totalCO2Tax;
        },
        calculateBalance () {
            this.companyData.balance += this.companyData.totalProfit;
        },  // End companyData
        // Calculate roundData
        
        // end Calculate roundData
        // 
        getPlantType(name) {
            return this.powerPlantTypes.find(type => type.name === name);
        },
        getResearchFacilityType(name) {
            return this.researchFacilities.find(type => type.name === name);
        },
        buyPlant(name) {
            const plantType = this.getPlantType(name);
            const builtPlant = this.builtPowerPlants.find(plant => plant.name === name);
            if (this.companyData.balance >= plantType.cost) {
                this.companyData.balance -= plantType.cost;
                builtPlant.number += 1;
                this.calculateCompanyData();
                this.cancanAffordPlant();
            } else {
                alert('Not enough balance to buy this plant.');
            }
        },
        canAffordPlant(name) {
            const plantType = this.getPlantType(name);
            return this.companyData.balance >= plantType.cost;
        },
        buyResearch(name) {
            const researchType = this.getResearchFacilityType(name);
            const builtResearch = this.builtResearchFacilities.find(research => research.name === name);
            if (this.companyData.balance >= researchType.cost) {
                this.companyData.balance -= researchType.cost;
                builtResearch.number += 1;
                this.calculateCompanyData();
                this.canAffordResearch();
            } else {
                alert('Not enough balance to buy this research.');
            }
        },
        canAffordResearch(name) {
            const researchType = this.getResearchFacilityType(name);
            return this.companyData.balance >= researchType.cost;
        },
        // Data handling 
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