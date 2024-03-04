<template>
    <div class="w-fit h-fit relative">
        <button @click="$emit('updateAdderMenu', !isVisible)" class="flex flex-wrap items-center group gap-1.5 w-fit text-[var(--primary-color)] group-hover:text-[var(--main-hover)]">
            <span class="hidden sm:block">create project</span>
            <span class="p-1.5 flex-auto rounded-full bg-[var(--primary-color)] group-hover:bg-[var(--main-hover)] transition-all ease-in-out duration-500">
                <cross class="w-[2.0rem] flex-auto sm:w-[2.4rem] h-auto"/>
            </span>
        </button>

        <Transition name="menu">
            <div class="w-[var(--create-proj)]  absolute top-[120%] right-0 z-40 card bg-[var(--background-color)] p-10" v-show="isVisible">
                <div class="flex flex-wrap items-center justify-center gap-3.5">
                    <h6 class="capitalize p-3.5">new task</h6>
                    <button @click="closeBox" type="button" class="p-3.5">
                        <cancle :stroke="'var(--boring-btn)'"/>
                    </button>
                </div>
                <form class="flex flex-wrap flex-col gap-3.5" >
                    <Transition name="warning">
                        <small v-show="warn" class="capitalize text-[var(--danger-color)] text-left">
                            all fields must be filled
                        </small>
                    </Transition>
                    
                    <inputField :entry="taskName" :placeholder="'task name'" :type="'text'" @inputEvent="taskNameUpdate"/>
                    <textarea name="desc" cols="20"  v-model="taskDesc" class="w-full p-3.5 border-2 border-[var(--text-m)] focus:outline-none focus:border-[var(--primary-color)] bg-transparent caret-[var(--primary-color)] transition-all duration-500"></textarea>

                    <div class="flex flex-wrap flex-row items-center justify-between gap-5 sm:gap-10">
                        <div class="flex flex-wrap flex-row w-full min-[350px]:w-fit  max-h-max h-max items-stretch gap-1.5">
                            <input type="color" name="tag-color" v-model="taskTagColor" class="w-[3.2rem] h-auto p-1.5 bg-transparent border-2 border-[var(--text-m)] "/>
                            <inputField :entry="taskTag" :required="true" :placeholder="'tag'" :type="'text'" @inputEvent="taskTagUpdate" class="w-[10rem] flex-1 sm:flex-auto"/>
                        </div>
                        <!-- <timer :start="taskTime" @timeUpdate="taskTime = newVue"  /> -->
                        <button type="button" @click="createTask" class="px-4 py-2 w-fit text-[var(--text-h)] bg-[var(--primary-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--main-hover)] transition-all duration-500 rounded-[5rem]">
                            create
                        </button>
                    </div>

                </form>
            </div>
        </Transition>
    </div>
</template>
<script>
    import cross from '../assets/icons/new.vue';
    import cancle from '../assets/icons/cancle.vue';
    import inputField from './input.vue' 
    import timer from './timer.vue';
    import New from '../assets/icons/new.vue';
    

    export default{
        components:{
            cross,
            cancle,
            inputField,
            timer
        },
        props:[
            'isVisible'
        ],
        data(){
            return{
                taskName:'',
                taskDesc:'',
                taskTag:'',
                taskTagColor:'#6A6C6D',
                // isVisible:false,
                taskTime:null,
            }
        },
        methods:{
            taskNameUpdate(newValue){
                this.taskName = newValue;
            },
            taskTagUpdate(newValue){
                this.taskTag = newValue;
            },
            closeBox(){
                this.$emit('updateAdderMenu', !this.isVisible);
                this.taskName = null;
                this.taskDesc = null;
                this.taskTag = null;
                this.taskTagColor = '#6A6C6D';
                this.taskTime = null;
            },
            async createTask(){

                await this.$store.dispatch('createTask', 
                {   taskName : this.taskName, 
                    taskDesc : this.taskDesc, 
                    taskTag : this.taskTag, 
                    taskTagColor : this.taskTagColor, 
                    taskTime : this.taskTime,
                });

                if (! this.warn){

                    this.$emit('updateAdderMenu', !this.isVisible);

                    this.taskName = null;
                    this.taskDesc = null;
                    this.taskTag = null;
                    this.taskTagColor = null;
                    this.taskTime = null;
                }else{
                    //do nothing
                }
            }
        },
        computed:{
            warn(){
                return this.$store.state.taskCreateWarning;
            }
        },
       

    }
</script>
<style scoped>
input [type = 'color']{
    appearance: none;
    -webkit-appearance: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}

input[type="color"]::-webkit-color-swatch {
	border: none;
}

.menu-enter-active, .menu-leave-active{
    transition: all 0.5s ease-in-out;
    opacity: 1;
}
.menu-enter-from, .menu-leave-to{
    transition: all 0.5s ease-in-out;
    transform: translateY(-0.8rem);
    opacity: 0;
}

.warning-enter-active, .warning-leave-active{
    transition: all 0.5s ease-in-out;
    opacity: 1;
} 
.warning-enter-from, .warning-leave-to{
    transition: all 0.5s ease-in-out;
    transform: translateX(-8px);
    opacity: 0;
} 
</style>