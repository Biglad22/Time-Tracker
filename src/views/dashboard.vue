<template>
    <section class="hero-chart w-full h-[50%] mb-6">
        <lineChart class="max-h-full"/>
    </section>
    <div class="flex flex-wrap w-full justify-center gap-[24px]">
        <button @click="state = 'ongoing', taskState = false" :class="state ==='ongoing' ? 'text-[var(--primary-color)]' : null"  type="button">ongoing</button>
        <button @click="state = 'completed', taskState = true" :class="state ==='completed' ? 'text-[var(--primary-color)]' : null" type="button">completed</button>
    </div>
    <section class="w-full overflow-scroll">
        <div class="main-body overflow-scrol">
            
            <div class="tag w-fit capitalize p-3  rounded-md bg-[var(--secondary-color)]">
                <small class=" inline-block">
                    {{ state }}
                </small>
            </div>
            <div class="main-body">

                <div v-if="taskState" class="overflow-scroll ">
                    <Task v-for="(i , index) in completedTasks" :key="index" :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" class="mb-3.5">
                        <template v-slot:task-name>
                            {{ i.taskName }}
                        </template>
                        <template v-slot:task-desc>
                            {{ i.taskDesc }}
                        </template>
                    </Task>
                </div>
                <div v-else class="overflow-scroll ">
                    <Task v-for="(i , index) in inCompletedTasks" :key="index" :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" class="mb-3.5">
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
</template>
<script>
    import Task from '@/components/Task.vue';
    import { mapGetters } from 'vuex';
    import lineChart from '@/components/lineChart.vue';

    export default{
        components:{
            Task,
            lineChart
        },
        data(){
            return{
                state :'ongoing',
                taskState : false,
            }
        },  
        computed:{
            ...mapGetters(['completedTasks', 'inCompletedTasks'])
        },
        mounted(){
            this.$store.dispatch('onAuthStateChanged');  
        },
        updated(){
            this.$store.dispatch('checkNetwork');
        }
        
    }
</script>
