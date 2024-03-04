<template>
    <Line  :data="data" :options="options">Chart couldn't be loaded.</Line> 
</template>

<script>
import { Line} from 'vue-chartjs';
import { mapGetters } from 'vuex';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Filler } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
    components:{
        Line
    },
    data(){
      return{
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                // Set your maximum value here
                max: 100,
                stepSize: 12
              }
            }
          }
        }
      }
    },
    computed:{

      ...mapGetters(['hoursWorked']),
      data(){
          return{
      
              labels: this.$store.state.chartData.labels,
              datasets: [
                {
                  label: 'Weekly Activities',
                  backgroundColor: 'rgb(20, 1, 249)',
                  fill: {
                    target : 'origin',
                    above : 'rgba(178, 171, 171,0.2)'
                  },
                  borderColor: 'rgba(76,61,254,1)',
                  tension: 0.3,
                  data: this.hoursWorked
                }
              ]
          }
      }
    
    }
}
</script>