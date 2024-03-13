<template>
    <div class="block h-[100%] min-h-[50vh] overflow-scroll">
        <nav class="w-full flex flex-wrap justify-between bg-[var(--background-color)] absolute top-auto left-0 z-40 py-3.5 pt-0 items-center">
            <div class="text-[var(--text-m)]">
                <small class="today capitalize me-5 sm:me-10 hidden sm:inline-block">
                    {{ clock }}
                </small>

                <small class="today capitalize inline-block">
                    {{ whatDay }}
                </small>
            </div>
            <createTask :isVisible="adderIsVisible" @updateAdderMenu="updateAdderMenu" />
        </nav>
        <main class=" flex-1 flex-shrink min-h-[50vh] relative">
            <!-- FIXME  -->
            <div class=" text-center mt-[10%] " v-if="inCompletedLength < 1">
                <h6 class=" capitalize text-[var(--text-l)]">
                    you have no task yet 
                </h6>
            </div>
            <div class=" mt-20 " v-else v-for="(n , weekDate) in sortedTasks"  :key="weekDate">
                <span class="this-week w-full px-1.5 py-3.5 bg-[var(--secondary-color)] block rounded-sm sticky top-[36px] z-20 backdrop-blur-md">
                    <p class="tag-name text-[var(--text-m)] capitalize font-medium">
                        {{ weekDate }}
                    </p>
                </span>
                <div  v-for="(taskArr, dayDate) in n" :key="dayDate">
                    
                    <span class="flex flex-wrap gap-1.5 py-7 pb-2.5 items-center text-[var(--text-l)]">
                        <span class="block uppercase tag-name">
                            {{ dayDate }}
                        </span>
                        <hr class=" flex-1 border-[var(--text-l)]"/>
                    </span>
                    <task  v-for="(i, index) in taskArr"  :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" :adderIsVisible="adderIsVisible" :taskMenuOpened="taskMenuOpened" @updateTaskMenuOpened="updateTaskMenuOpened" @updateMenuVisibility="updateMenuVisibility" :isVisible="activeMenus[i.taskID]" :key="index" :index="index" class="mb-3.5">
                        <template v-slot:task-name>
                            {{ i.taskName }}
                        </template>
                        <template v-slot:task-desc>
                            {{ i.taskDesc }}
                        </template>
                    </task>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
        import Task from '@/components/Task.vue';
        import createTask from '@/components/createTask.vue';
        import { mapGetters } from 'vuex';
    export default{
        components:{
            createTask,
            Task
        },
        data(){
            return{
                month:['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'],
                day:['sun','mon','tue', 'wed','thur', 'fri', 'sat'],
                toDay: new Date().getDate(),
                toMonth: new Date().getMonth(),
                toYear: new Date().getFullYear(),
                hour: new Date().getHours(),
                min: new Date().getMinutes(),
                sec: new Date().getSeconds(),
                adderIsVisible : false,
                taskMenuOpened : false,
                activeMenus :{}
                
            }
        },
        computed:{
            ...mapGetters(['completedTasks', 'inCompletedTasks', 'inCompletedLength']),
            whatDay(){

                return `${this.day[new Date().getDay()]} ${ this.toDay} ${this.month[this.toMonth]}, ${this.toYear}`
            },
            clock(){
                return `${this.pad(this.hour)} : ${this.pad(this.min)} : ${this.pad(this.sec)}`
            },
            userDataID(){
                return this.$store.state.userDataId;
            },
            sortedTasks() {

              const tasksByWeek = {};
              this.inCompletedTasks.forEach(task => {
                const weekStartDate = new Date(task.dateCreated);

                weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay()); // Start of week

                const weekEndDate = new Date(weekStartDate);

                weekEndDate.setDate(weekEndDate.getDate() + 6); // End of week

                const weekRange = `${this.month[weekEndDate.getMonth() + 1]} ${weekStartDate.toISOString().slice(8, 10)} - ${weekEndDate.toISOString().slice(8, 10)} ${weekEndDate.getFullYear()}`;
                
                if (!tasksByWeek[weekRange]) {
                  tasksByWeek[weekRange] = {};
                }
            
                const taskDate = new Date(task.dateCreated);
                const dayDate = `${!isNaN(Number(taskDate.toISOString().slice(6, 8))) ? taskDate.toISOString().slice(9, 10) : taskDate.toISOString().slice(8, 10)}  ${ !isNaN(Number(taskDate.toISOString().slice(6, 8))) ? this.month[Number(taskDate.toISOString().slice(6, 8))]  : this.month[Number(taskDate.toISOString().slice(6, 7))]}`; // Extract YYYY-MM-DD
                if (!tasksByWeek[weekRange][dayDate]) {
                  tasksByWeek[weekRange][dayDate] = [];
                }
            
                tasksByWeek[weekRange][dayDate].push(task);
              });
              return tasksByWeek;
            },
            
        },
        methods:{
            
            
            pad(value){
                return value < 10 ? `0${value}` : value; 
            },
            timeCounter(){
    
                setInterval(()=>{
                    return(
                        this.hour = new Date().getHours(),
                        this.min = new Date().getMinutes(),
                        this.sec = new Date().getSeconds()
                    )
                },1000);

            },
            updateAdderMenu(newValue){
                return this.adderIsVisible = newValue;
            },
            updateTaskMenuOpened(newValue){
                return this.taskMenuOpened = newValue;
            },
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
            inCompletedLength(newValue, oldValue){
                this.inCompletedTasks.forEach(elem => {
                this.activeMenus[elem.taskID] = false;
            });
            }
        },
        created(){
            this.inCompletedTasks.forEach(elem => {
                this.activeMenus[elem.taskID] = false;
            });
        },
        beforeMount(){
            return this.timeCounter();
        },
        

    }   
</script>