<template>
    <div tabindex="0" @keyup="keyHandler" class="block h-[100%] overflow-scroll">
        <nav class="w-full flex flex-wrap mb-10 justify-between bg-[var(--background-color)] absolute top-0 left-0 z-40 py-3.5 pt-0 items-center">
            <div class="text-[var(--text-l)]">
                <div class="today capitalize text-xs me-5 sm:me-10 hidden sm:inline-block">
                    {{ clock }}
                </div>

                <div class="today capitalize text-xs inline-block">
                    {{ whatDay }}
                </div>
            </div>
            <createTask :isVisible="adderIsVisible" @updateAdderMenu="updateAdderMenu" />
        </nav>
        <main class=" flex-1 flex-shrink relative">
            <!-- FIXME  -->
            <div class=" text-center" v-show="inCompletedLength < 1 ? true : false">
                <h6 class=" capitalize text-[var(--text-l)]">
                    you have no task yet 
                </h6>
            </div>
            <div class="mt-12 " v-show="inCompletedLength > 0 ? true : false" v-for="(i , index) in inCompletedTasks" >
                <span class="this-week w-full px-1.5 py-3.5 bg-[var(--secondary-color)] block rounded-sm sticky top-[41px] z-20 backdrop-blur-md">
                    <p class="tag-name text-[var(--text-m)] capitalize font-medium">
                        shade get sweet 
                    </p>
                </span>
                <div>
                    
                    <span class="flex flex-wrap gap-1.5 py-7 pb-2.5 items-center text-[var(--text-l)]">
                        <span class="block uppercase tag-name">
                            {{ 'gow' }}
                        </span>
                        <hr class=" flex-1 border-[var(--text-l)]"/>
                    </span>
                    <task v-if="!i.isCompleted" :isTiming="i.isTiming" :tag="i.taskTag" :isCompleted="i.isCompleted" :tagColor="i.taskTagColor" :taskTime="i.taskTime" :taskID="i.taskID" :adderIsVisible="adderIsVisible" :taskMenuOpened="taskMenuOpened" @updateTaskMenuOpened="updateTaskMenuOpened" class="mb-3.5">
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
        },
        methods:{
            keyHandler(event){
                event.preventDefault();

                if (event.ctrlKey && event.key === 'n'){
                    this.adderIsVisible = true;
                }
            },
            
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
            }
            // daySep(arr){
            //     let collection = [];

            //     for(let i = 0; i < 7; i++){
            //         demo = arr.filter(elem =>{
            //             let day =  elem.dateCreated.split(' ');
            //             day = day[0];
            //             return day === i;
            //         })

            //         return collection.push(demo);
            //     }
                
            //     console.log(collection);

            //     return collection;
            // }
        },
        beforeMount(){
            return this.timeCounter();
        },
        mounted(){
            this.$store.dispatch('checkNetwork');
            this.$store.dispatch('onAuthStateChanged');
            console.log(typeof this.inCompletedLength);
        },
        updated(){
            this.$store.dispatch('checkNetwork');
        },
        // created(){
        //     document.addEventListener('keydown', this.newTask(Event));
        // },
        // beforeDestroy(){
        //     document.removeEventListener('keydown', this.newTask(Event));
        // }

    }   
</script>