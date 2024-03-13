<template>
    <Transition name="chart">
        <section class="hero-chart w-full box-border mb-[20px]" v-show="showChart">
            <p class="capitalize text-center ">{{ this.$store.state.userData.userEmail }} </p>
            <lineChart class="max-h-full"/>
        </section>
    </Transition>
    <Transition name="main-body">
        <section class="w-full relative" :class="showChart ? 'h-[60%] max-h-[60%]' : 'h-full max-h-full min-h-full'" >
            <div class="flex flex-wrap p-3.5 w-full bg-[var(--background-color)] justify-center gap-[24px] absolute z-30 left-1/2 top-[-1px] -translate-x-1/2">
                <button @click=" showChart = true"  v-show="!showChart" type="button">chart</button>
                <button @click="state = 'ongoing', taskState = false" :class="state ==='ongoing' ? 'text-[var(--primary-color)]' : null"  type="button" id="buttonOne">ongoing</button>
                <button @click="state = 'completed', taskState = true" :class="state ==='completed' ? 'text-[var(--primary-color)]' : null" type="button" id="buttonTwo">completed</button>
            </div>
            <div class="main-body max-h-[100%] h-[100%] min-h-[100%] pt-[40px] overflow-scroll" id="taskContainer" >

                <div class="tag w-fit capitalize p-3  rounded-md bg-[var(--secondary-color)]">
                    <small class=" inline-block">
                        {{ state }}
                    </small>
                </div>
                <div class="main-body h-[100%]"  >

                    <div v-if="taskState" class="overflow-scroll h-[100%] " id="tasks-wrapper">
                        <Task v-for="(i , index) in completedTasks" :key="index" :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" @updateMenuVisibility="updateMenuVisibility" :isVisible="activeMenus[i.taskID]" class="mb-3.5">
                            <template v-slot:task-name>
                                {{ i.taskName }}
                            </template>
                            <template v-slot:task-desc>
                                {{ i.taskDesc }}
                            </template>
                        </Task>
                    </div>
                    <div v-else class="overflow-scroll h-[100%]" id="tasks-wrapper" >
                        <Task v-for="(i , index) in inCompletedTasks" :key="index" :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" @updateMenuVisibility="updateMenuVisibility" :isVisible="activeMenus[i.taskID]" class="mb-3.5">
                            <template v-slot:task-name>
                                {{ i.taskName }}
                            </template>
                            <template v-slot:task-desc>
                                {{ i.taskDesc }}
                            </template>
                        </Task>
                    </div>
                </div>
            </div>

        </section>
    </Transition>
</template>
<script>
    import Task from '@/components/Task.vue';
    import { mapGetters } from 'vuex';
    import lineChart from '@/components/lineChart.vue';
    import { Transition } from 'vue';

    export default{
        components:{
            Task,
            lineChart
        },
        data(){
            return{
                state :'ongoing',
                taskState : false,
                activeMenus :{},
                showChart : true
            }
        },  
        computed:{
            ...mapGetters(['allTasks', 'tasksLength', 'completedTasks', 'inCompletedTasks'])
        },
        methods:{
            updateMenuVisibility(newValue){
                for (let i in this.activeMenus){

                    if( Number(i) !== Number(newValue.id)){
                        this.activeMenus[i] = false
                        
                    }
                    else{
                        this.activeMenus[i] = newValue.value;
                    }
                }

            }
        },
        watch:{
            tasksLength(newValue, oldValue){
                this.allTasks.forEach(elem => {
                this.activeMenus[elem.taskID] = false;
            });
            }
        },
        created(){
            this.allTasks.forEach(elem => {
                this.activeMenus[elem.taskID] = false;
            });
        },
        mounted(){
            document.getElementById('taskContainer').addEventListener('click', ()=>{
                this.showChart = false;
            } );
            document.getElementById('buttonOne').addEventListener('click', ()=>{
                this.showChart = false;
            } );
            document.getElementById('buttonTwo').addEventListener('click', ()=>{
                this.showChart = false;
            } );
            document.getElementById('taskContainer').addEventListener('scroll', ()=>{
                this.showChart = false;
            } );

            document.getElementById('tasks-wrapper').addEventListener('scroll', ()=>{
                this.showChart = false;
            } );
            
        }
        
    }
</script>
<style scoped>
    .hero-chart{
        height: calc( 40% - 20px);
        max-height: calc( 40% - 20px);
    }

    .chart-enter-active, .chart-leave-active{
      transition: all 0.5s ease-in-out;
      opacity: 1;
      transform: translateX(0);
    }
    .chart-enter-from, .chart-leave-to{
      transform: translateY(-100%);
      opacity: 0.1;
    }

</style>