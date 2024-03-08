<template>
    <div class="hidden-menu h-fit w-fit relative">
        <div class="flex flex-wrap gap-3.5">
            <button type="button" @click="updateTaskMenuOpened" class="p-3.5 pe-1.5 w-fit group h-fit bg-transparent border-0">
                <moreMenu class="w-[2.0rem] : md:w-[2.4rem] h-auto" :isVisible="isVisible" />
            </button>
            <button type="button" @click="updateTaskMenuOpened" class="p-3.5 pe-1.5 w-fit group h-fit bg-transparent border-0" :class="menuShowing ? 'block' : 'hidden'">
                <span class="material-symbols-outlined p-1.5" @click="updateShowDesc">
                    expand_less
                </span>
            </button>
        </div>

        <Transition name="menu">
            <div v-show="isVisible" class="flex flex-wrap w-max flex-col py-7 gap-1.5 justify-start items-start rounded-sm absolute -top-[calc(100% + 0.8rem)] right-2 card  bg-[var(--background-color)] z-30">
                <button type="button" @click="updateCompleted" class="px-7 py-1.5 w-full hover:bg-[rgba(26,26,26,0.5)] text-left transition-all ease-in-out duration-500 flex flex-wrap items-center gap-10 justify-between" v-if="!isCompleted" >
                    <span class="uppercase text-[var(--success-color)]">
                        Completed
                    </span>
                    <check :stroke="'var(--success-color)'"/>
                </button>
                <button type="button" @click="updateShowDesc" class="px-7 py-1.5 w-full hover:bg-[rgba(26,26,26,0.5)] text-left transition-all ease-in-out duration-500 flex flex-wrap items-center gap-10 justify-between" >
                    <span class="uppercase text-[var(--boring-btn)]">
                        details
                    </span>
                    <info :stroke="'var(--boring-btn)'" />
                </button>
                <button type="button" @click="deleteTask" class="px-7 py-1.5 w-full hover:bg-[rgb(26,26,26,0.5)] text- flex flex-wrap items-center gap-10 justify-between transition-all ease-in-out duration-500" v-if="!isCompleted" >
                    <span class="uppercase text-[var(--danger-color)]">
                        delete
                    </span>
                    <cancle :stroke="'var(--danger-color)'" />
                </button>
            </div>   
        </Transition> 
    </div>
</template>
<script>
    import moreMenu from '../assets/icons/moremenu.vue';
    import { Transition } from 'vue';
    import check from '@/assets/icons/check.vue';
    import info from '@/assets/icons/info.vue';
    import pencil from '@/assets/icons/pencil.vue';
    import cancle from '@/assets/icons/cancle.vue';

    export default{
        components:{
            moreMenu,
            check,
            info,
            pencil,
            cancle
        },props:[
            'isCompleted',
            'taskID',
            'adderIsVisible',
            'taskMenuOpened'
        ],
        data(){
            return{
                isVisible: false,
                menuShowing: false
            }
        },
        methods:{
            updateShowDesc(){
                this.isVisible = this.isVisible ? false : this.isVisible
                this.menuShowing = !this.menuShowing;

                return this.$emit('updateShowDesc',this.menuShowing);
            },
            async deleteTask(){
                this.isVisible = !this.isVisible;
                return await this.$store.dispatch('deleteTask', {taskID : this.taskID});
            },
            async updateCompleted(){
                this.isVisible = !this.isVisible;
                return await this.$store.dispatch('updateCompleted', {taskID : this.taskID})
            },
            //FIXME fix menu closing
            updateTaskMenuOpened(){

                this.isVisible = !this.isVisible;

                let value = this.isVisible === true && this.taskMenuOpened === false ? true 
                            : this.isVisible === true && this.taskMenuOpened === true ? true 
                            : false;

                return this.$emit('updateTaskMenuOpened', value);
            }
        },
        watch:{
            adderIsVisible(newValue){
                this.isVisible = this.isVisible ? !this.isVisible : this.isVisible;
            },
            taskMenuOpened(newValue){
                return this.isVisible = newValue === true && this.isVisible ===true ? !this.isVisible : this.isVisible;
            }
        }
    }
</script>
<style>
.menu-enter-active, .menu-leave-active{
    transition: all 0.5s ease-in-out;
    transform: translateY(0);
    opacity: 1;
}
.menu-enter-from, .menu-leave-to{
    transition: all 0.5s ease-in-out;
    transform: translateY(-0.8rem);
    opacity: 0;
}
</style>