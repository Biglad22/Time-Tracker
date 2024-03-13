<template>
    <div>
        <div class="flex flex-row flex-wrap gap-10 justify-between  items-center">
            <p class=" capitalize font-normal transition-all duration-500 max-w-[40%] text-nowrap truncate ..." :class=" isTiming ? 'text-[var(--text-h)]' : 'text-[var(--text-m)]' ">
                <slot name="task-name"></slot>
            </p>
            <div class="flex flex-row flex-wrap gap-3.5 items-center"> 
                <tasktag v-if="!isCompleted" :tagColor="tagColor" class=" hidden sm:flex">
                    <template v-slot:tag>
                        {{ tag }}
                    </template>
                </tasktag>
                <timer  v-if="!isCompleted" :taskID="taskID" :start="taskTime"  class=" hidden sm:flex"/>
                <p class="capitalize text-[var(--success-color)]" v-else>
                    Completed
                </p>
                <moreMenu :index="index" :taskID="taskID" :taskMenuOpened="taskMenuOpened" @updateMenuVisibility="updateMenuVisibility" @updateTaskMenuOpened="updateTaskMenuOpened" :showDesc="showDesc" :isCompleted="isCompleted" @updateShowDesc="updateShowDesc" :isVisible="isVisible" :adderIsVisible="adderIsVisible"/>
            </div>
        </div>
        <Transition name="menu">
            <div v-show="showDesc" class="pb-3.5">
                <span class="py-3.5 h-fit block">
                    <hr class="w-full border-[var(--border-l)]"/>
                </span>
            
                <div>
                    <div>
                        <tasktag :tagColor="tagColor" class=" flex sm:hidden">
                            <template v-slot:tag>
                                {{ tag }}

                                
                            </template>
                        </tasktag>
                    </div>
                    <p class=" text-[var(--text-h)]">
                        Description: 
                        <span class="text-[var(--text-m)]">    <slot name="task-desc"></slot> </span>
                    </p>
                    <div class="flex flex-wrap w-full gap-3 justify-between items-baseline">
                        <small class="text-[var(--text-m)]">
                            {{ Math.floor( taskTime / 3600000 )}}hrs : {{ Math.floor((taskTime % (1000 * 60 * 60)) / (1000 * 60)) }} mins worked 
                        </small>
                        <timer :start="taskTime" v-if="!isCompleted" :isCompleted="isCompleted" :taskID="taskID"  class=" flex sm:hidden" />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script>
    import play from '../assets/icons/play.vue';
    import pause from '../assets/icons/pause.vue';
    import check from '../assets/icons/check.vue';
    import cancle from '../assets/icons/cancle.vue';
    import detail from '../assets/icons/info.vue';
    import edit from '../assets/icons/pencil.vue';
    import timer from './timer.vue';
    import tasktag from './tasktag.vue'
    import moreMenu from './taskmenu.vue';
    import { Transition } from 'vue';
    import { mapGetters } from 'vuex';

export default{
    components:{
        tasktag,
        play,
        pause,
        moreMenu,
        check,
        cancle,
        detail,
        edit,
        timer
    },
    data(){
        return{
            curTime:null,
            hours:null,
            mins:null,
            timer:null,
            showDesc:false,
        }
    },
    computed:{
        ...mapGetters(['timerState']),
        isTiming(){
            return this.timerState(this.taskID);
        }
    },
    props:[
        'tag',
        'tagColor',
        'isCompleted',
        'taskID',
        'taskTime',
        'adderIsVisible',
        'taskMenuOpened',
        'isVisible',
        'index'
    ],
    methods:{
        updateShowDesc(newValue){
            this.showDesc = newValue;
        },
        updateTaskMenuOpened(newValue){
            return this.$emit('updateTaskMenuOpened', newValue);
        },
        updateMenuVisibility(newValue){
            this.$emit('updateMenuVisibility', {value : newValue, id : this.taskID})
        }
    }
 }
</script>
<style>
.menu-enter-active, .menu-leave-active{
    transition: all 0.5s ease-in-out;
    opacity: 1;
}
.menu-enter-from, .menu-leave-to{
    transform: translateY(-0.4rem);
    opacity: 0;
}
</style>