export default {
  data() {
    return {
      eatersValue: 0,
      menValue: 0,
      childrenValue: 0,
      durationValue: 1,
      alcoholConsumptionLevel: 1,
      min: 0,
      max: 60,
      alcoholLevelLabels: ["Pouco", "Moderadamente", "DAQUELE JEITÃO"],
      itemsMeatSelection: [
        { id: 1, name: "Picanha", checked: false },
        { id: 2, name: "Costela de Porco", checked: false },
        { id: 3, name: "Cupim", checked: false },
        { id: 4, name: "Panceta", checked: false },
        { id: 5, name: "Coxinha da Asa", checked: false },
        { id: 6, name: "Maminha", checked: false },
        { id: 7, name: "Linguiça Toscana", checked: false },
        { id: 8, name: "Sobrecoxa", checked: false },
      ],
      itemsSideDishesSelection: [
        { id: 1, name: "Vinagrete", checked: false },
        { id: 2, name: "Farofa", checked: false },
        { id: 3, name: "Arroz Branco", checked: false },
        { id: 4, name: "Maionese", checked: false },
        { id: 5, name: "Pão de Alho", checked: false },
        { id: 6, name: "Salada", checked: false },
        { id: 7, name: "Queijo Coalho", checked: false },
        { id: 8, name: "Feijão Tropeiro", checked: false },
      ],
      itemsDrinksSelection: [
        { id: 1, name: "Cerveja", checked: false },
        { id: 2, name: "Caipirinha", checked: false },
        { id: 3, name: "Refrigerante", checked: false },
        { id: 4, name: "Água", checked: false },
        { id: 5, name: "Energético", checked: false },
        { id: 6, name: "Suco de Frutas", checked: false },
        { id: 7, name: "Vinho", checked: false },
        { id: 8, name: "Gin", checked: false },
      ],
      itemsSupplySelection: [
        { id: 5, name: "Copos Descartáveis", checked: false },
        { id: 6, name: "Pratos e Talheres descartáveis", checked: false },
        { id: 7, name: "Guardanapos", checked: false },
      ],
      results: [],
      errors: [],
    };
  },
  methods: {
    updateValue(valueName) {
      this[valueName] = Number(this[valueName]);
    },
    validateInputs() {
      this.errors = [];
      const selectedMeats = this.itemsMeatSelection.filter((item) => item.checked);

      if (this.menValue <= 0) {
        this.errors.push("É necessário informar a quantidade de adultos!");
      }
      if (selectedMeats.length === 0) {
        this.errors.push("Selecione ao menos um tipo de carne!");
      }
      if (this.durationValue < 1) {
        this.errors.push("A duração do churrasco deve ser de no mínimo 1 hora!");
      }

      return this.errors.length === 0;
    },
    calculate() {
      if (!this.validateInputs()) {
        alert(this.errors.join("\n"));
        return;
      }

      const selectedMeats = this.itemsMeatSelection.filter((item) => item.checked);
      const selectedSideDishes = this.itemsSideDishesSelection.filter((item) => item.checked);
      const selectedDrinks = this.itemsDrinksSelection.filter((item) => item.checked);

      const totalEaters = this.eatersValue;
      const totalAdults = this.menValue - totalEaters;
      const totalChildren = this.childrenValue;
      const totalTimeMultiplier = this.durationValue > 5 ? 1 + (this.durationValue - 5) * 0.1 : 1;

      const adjustedAdults = totalAdults + (totalEaters * 2.35);

      this.results = [];
      
      // Cálculo de Carnes
      const baseMeatPerAdult = 500;
      const baseMeatPerChild = 250;
      const totalMeat = (adjustedAdults * baseMeatPerAdult + totalChildren * baseMeatPerChild) * totalTimeMultiplier;

      selectedMeats.forEach((meat) => {
        this.results.push({
          item: meat.name,
          quantity: (totalMeat / selectedMeats.length / 1000).toFixed(2) + " kg",
        });
      });
 
      // Cálculo de Acompanhamentos
      selectedSideDishes.forEach((sideDish) => {
        let basePerAdult = 0;
        let basePerChild = 0;

        switch (sideDish.name) {
          case "Vinagrete":
            basePerAdult = 100;
            basePerChild = 50;
            break;
          case "Farofa":
            basePerAdult = 50;
            basePerChild = 25;
            break;
          case "Arroz Branco":
            basePerAdult = 200;
            basePerChild = 100;
            break;
          case "Maionese":
            basePerAdult = 100;
            basePerChild = 55;
            break;
          case "Salada":
            basePerAdult = 100;
            basePerChild = 40;
            break;
          case "Feijão Tropeiro":
            basePerAdult = 150;
            basePerChild = 75;
            break;
          case "Pão de Alho":
          case "Queijo Coalho":
            basePerAdult = 100;
            basePerChild = 50;
            break;
        }

        const totalBase = (adjustedAdults * basePerAdult + totalChildren * basePerChild) * (["Pão de Alho", "Queijo Coalho"].includes(sideDish.name) ? totalTimeMultiplier : 1);

        this.results.push({
          item: sideDish.name,
          quantity: (totalBase / 1000).toFixed(2) + " kg",
        });
      });

      // Cálculo de Bebidas
      let alcoholMultiplier = 1; // Padrão: Moderado
      if (this.alcoholConsumptionLevel == 0) alcoholMultiplier = 0.5; // Pouco
      if (this.alcoholConsumptionLevel == 2) alcoholMultiplier = 1.5; // Alto

      selectedDrinks.forEach((drink) => {
        let basePerAdult = 0;
        let basePerChild = 0;
        let unit = "";

        switch (drink.name) {
          case "Cerveja":
            basePerAdult = 2100 * alcoholMultiplier;
            unit = "latinhas";
            break;
          case "Caipirinha":
            basePerAdult = 200 * alcoholMultiplier;
            unit = "copos";
            break;
          case "Refrigerante":
            basePerAdult = 1000;
            basePerChild = 500;
            unit = "ml";
            break;
          case "Água":
            basePerAdult = 500;
            basePerChild = 500;
            unit = "ml";
            break;
          case "Energético":
            basePerAdult = 500;
            unit = "ml";
            break;
          case "Suco de Frutas":
            basePerAdult = 500;
            basePerChild = 250;
            unit = "ml";
            break;
          case "Vinho":
            basePerAdult = 350 * alcoholMultiplier;
            unit = "garrafas";
            break;
          case "Gin":
            basePerAdult = 400 * alcoholMultiplier;
            unit = "drinks";
            break;
        }

        const totalBase = (adjustedAdults * basePerAdult + totalChildren * basePerChild) * totalTimeMultiplier;
        let convertedQuantity = totalBase;

        if (drink.name === "Cerveja") {
          convertedQuantity = Math.ceil(totalBase / 350);
        } else if (drink.name === "Vinho") {
          convertedQuantity = Math.ceil(totalBase / 1000);
        } else if (drink.name === "Caipirinha" || drink.name === "Gin") {
          convertedQuantity = Math.ceil(totalBase / 300);
        }

        this.results.push({
          item: drink.name,
          quantity: convertedQuantity + " " + unit,
        });
      });
       // Calcular Suprimentos
       const selectedSupplies = this.itemsSupplySelection.filter((item) => item.checked); // Corrigir definição
       selectedSupplies.forEach((supply) => {
         let basePerPerson = 0;
 
         switch (supply.name) {
           case "Copos Descartáveis": // Corrigido nome
             basePerPerson = 5; // Média de 2 copos por pessoa
             break;
           case "Pratos e Talheres descartáveis": // Corrigido nome
             basePerPerson = 1.5; // Média de 1,5 pratos/talheres por pessoa
             break;
           case "Guardanapos":
             basePerPerson = 5; // Média de 5 guardanapos por pessoa
             break;
         }
 
         const totalPeople = adjustedAdults + totalChildren;
 
         const totalSupply = Math.ceil(totalPeople * basePerPerson * 1.1);
 
         this.results.push({
           item: supply.name,
           quantity: totalSupply + (supply.name === "Carvão" || supply.name === "Gelo" ? " kg" : " unidades"),
         });
       });
      alert("Cálculo realizado com sucesso! Verifique os resultados abaixo.");
    },

  },
};
