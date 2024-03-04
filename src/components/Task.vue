<template>
    <div>
        <div class="flex flex-row flex-wrap gap-10 justify-between  items-center">
            <h6 class=" capitalize font-normal transition-all duration-500" :class="isTiming ? 'text-[var(--text-h)]' : 'text-[var(--text-m)]' ">
             <slot name="task-name"></slot>
            </h6>
            <div class="flex flex-row flex-wrap gap-3.5 items-center"> 
                <tasktag v-if="!isCompleted" :tagColor="tagColor" class=" hidden sm:flex">
                    <template v-slot:tag>
                        {{ tag }}
                    </template>
                </tasktag>
                <timer  v-if="!isCompleted" @updatePlaying="updateIsPlaying" :taskID="taskID"  :start="taskTime" :isTiming="isTiming" class=" hidden sm:flex"/>
                <p class="capitalize text-[var(--success-color)]" v-else>
                    Completed
                </p>
                <moreMenu :taskID="taskID" :taskMenuOpened="taskMenuOpened" @updateTaskMenuOpened="updateTaskMenuOpened" :showDesc="showDesc" :isCompleted="isCompleted" @updateShowDesc="updateShowDesc" :adderIsVisible="adderIsVisible"/>
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
                    <p class=" text-[var(--text-m)]">
                        Description: 
                        <slot name="task-desc"></slot>
                    </p>
                    <timer :start="taskTime" v-if="!isCompleted" @updatePlaying="updateIsPlaying" :isTiming="isTiming" :isCompleted="isCompleted" :taskID="taskID"  class=" flex sm:hidden" />
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
            isTiming:false,
            showDesc:false,
        }
    },
    props:[
        'tag',
        'tagColor',
        'isCompleted',
        'taskID',
        'taskTime',
        'adderIsVisible',
        'taskMenuOpened'
    ],
    methods:{
        updateIsPlaying(newValue){
            this.isTiming = newValue;
        },
        updateShowDesc(newValue){
            this.showDesc = newValue;
        },
        updateTaskMenuOpened(newValue){
            return this.$emit('updateTaskMenuOpened', newValue);
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