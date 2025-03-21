<template>
  <main>
    <div class="Container">
      <img src="../../assets/barbecue.png" alt="">
      <div>
        <h1>Planeje seu churrasco sem stress: calcule a quantidade certa de tudo!</h1>
        <h2>Preencha as informações e tenha o resultado na hora!</h2>
        <div class="black-component"></div>

        <div class="calc-button-area">
          <button class="calc-button" @click="calculate">Calcular</button>
        </div>
        <div v-if="results.length" class="results-table">
          <h1>Resultados do Churrasco</h1>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in results" :key="result.item">
                <td>{{ result.item }}</td>
                <td>{{ result.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="Container2">
      <div class="input-section-sliders">
        <div class="slider-container">
          <h1>Quantidade de Comilões</h1>
          <div class="slider-wrapper">
            <input type="range" id="eaters-slider" :min="min" :max="max" :step="step" v-model="eatersValue"
              @input="updateValue('eatersValue')" />
            <span id="slider-value">{{ eatersValue }}</span>
          </div>
        </div>

        <div class="slider-container">
          <h1>Quantidade de Adultos</h1>
          <div class="slider-wrapper">
            <input type="range" id="men-slider" :min="min" :max="max" :step="step" v-model="menValue"
              @input="updateValue('menValue')" />
            <span id="slider-value">{{ menValue }}</span>
          </div>
        </div>


        <div class="slider-container">
          <h1>Quantidade de Crianças</h1>
          <div class="slider-wrapper">
            <input type="range" id="children-slider" :min="min" :max="max" :step="step" v-model="childrenValue"
              @input="updateValue('childrenValue')" />
            <span id="slider-value">{{ childrenValue }}</span>
          </div>
        </div>

        <div class="meat-select-section">
          <div class="black-component-line"></div>
          <h1>Qual seu corte de carne favorito?</h1>
          <ul>
            <li v-for="itemsMeatSelection in itemsMeatSelection" :key="itemsMeatSelection.id">
              <label class="container">
                <input type="checkbox" v-model="itemsMeatSelection.checked" />
                <div class="checkmark"></div>
                {{ itemsMeatSelection.name }}
              </label>
            </li>
          </ul>
          <div class="black-component-line"></div>
        </div>
        <div class="side-dishes-selection-area">
          <h1>E para acompanhar? O que deseja?</h1>
          <ul>
            <li v-for="itemsSideDishesSelection in itemsSideDishesSelection" :key="itemsSideDishesSelection.id">
              <label class="container">
                <input type="checkbox" v-model="itemsSideDishesSelection.checked" />
                <div class="checkmark"></div>
                {{ itemsSideDishesSelection.name }}
              </label>
            </li>
          </ul>
          <div class="black-component-line"></div>
        </div>
        <div class="drinks-selection-area">
          <h1>Como deseja se refrescar?</h1>
          <ul>
            <li v-for="itemsDrinksSelection in itemsDrinksSelection" :key="itemsDrinksSelection.id">
              <label class="container">
                <input type="checkbox" v-model="itemsDrinksSelection.checked" />
                <div class="checkmark"></div>
                {{ itemsDrinksSelection.name }}
              </label>
            </li>
          </ul>
          <div class="black-component-line"></div>
        </div>
        <div class="supply-selection-area">
          <h1>Suprimentos</h1>
          <ul>
            <li v-for="itemsSupplySelection in itemsSupplySelection" :key="itemsSupplySelection.id">
              <label class="container">
                <input type="checkbox" v-model="itemsSupplySelection.checked" />
                <div class="checkmark"></div>
                {{ itemsSupplySelection.name }}
              </label>
            </li>
          </ul>
          <div class="black-component-line"></div>
        </div>
        <div class="input-duration-section-sliders">
          <div class="slider-container">
            <h1>Qual a Duração do seu Churrasco</h1>
            <div class="slider-wrapper" style="margin-top: 4vh;">
              <input type="range" id="duration-slider" :min="1" :max="12" :step="step" v-model="durationValue"
                @input="updateValue('durationValue')" />
              <span id="slider-value">{{ durationValue + " Hrs" }}</span>
            </div>
          </div>
        </div>

        <div class="slider-container">
          <div class="input-alcohol-section-sliders">
            <h1>Como os convidados costumam Beber?(Alcoolicos)</h1>
            <div class="slider-wrapper" style="margin-top: 4vh;">
              <input type="range" id="alcohol-slider" :min="0" :max="2" :step="step" v-model="alcoholConsumptionLevel"
                @input="updateAlcoholLevel" />
              <span id="slider-value">{{ alcoholLevelLabels[alcoholConsumptionLevel] }}</span>
            </div>
          </div>
        </div>
      </div><!--Fechamento container2-->
    </div>

    <br>
    <br>
    <br>


  </main>
</template>
<script src="../../BackEnd/BarbecueCalculatorBackEnd.js"></script>
<style scoped src="../../Styles/MainStyle.css"></style>