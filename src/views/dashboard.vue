<template>
    <section class="hero-chart w-full h-[50%] mb-6">
        <lineChart class="max-h-full"/>
    </section>
    <section class="w-full h-[50%] overflow-scroll relative">
        <div class="flex flex-wrap p-3.5 w-full bg-[var(--background-color)] justify-center gap-[24px] fixed z-30 left-1/2 -translate-x-1/2">
            <button @click="state = 'ongoing', taskState = false" :class="state ==='ongoing' ? 'text-[var(--primary-color)]' : null"  type="button">ongoing</button>
            <button @click="state = 'completed', taskState = true" :class="state ==='completed' ? 'text-[var(--primary-color)]' : null" type="button">completed</button>
        </div>
        <div class="main-body mt-[40px] overflow-scrol">
            
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
        }
        
    }
</script>
