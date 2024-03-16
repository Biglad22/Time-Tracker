<template>
    <div class="hidden-menu h-fit w-fit relative">
        <div class="flex flex-wrap gap-3.5">
            <button type="button" @click="updateTaskMenuOpened" class="p-3.5 pe-1.5 w-fit group h-fit bg-transparent border-0">
                <moreMenu class="w-[2.0rem] : md:w-[2.4rem] h-auto" :isVisible="isVisible" ref="taskMenu"/>
            </button>
            <button type="button" @click="updateShowDescClose" class="p-3.5 pe-1.5 w-fit group h-fit bg-transparent border-0" :class="menuShowing ? 'block' : 'hidden'">
                <span class="material-symbols-outlined p-1.5" >
                    expand_less
                </span>
            </button>
        </div>

        <Transition name="menu">
            <div v-show="isVisible" class="flex flex-wrap w-max flex-col py-7 gap-1.5 justify-start items-start rounded-sm absolute right-2 card  bg-[var(--background-color)] z-30" :class="pos < 196 ? 'bottom-full' : 'top-full'" >
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
            'taskMenuOpened',
            'isVisible',
            'index'
        ],
        data(){
            return{
                menuShowing: false,
                pos: null,
            }
        },
        methods:{
            updateShowDescClose(){
                this.menuShowing = !this.menuShowing;

                return this.$emit('updateShowDesc',this.menuShowing);
            },
            updateShowDesc(){
                this.$emit('updateMenuVisibility', this.isVisible ? false : this.isVisible);
                this.menuShowing = !this.menuShowing;

                return this.$emit('updateShowDesc',this.menuShowing);
            },
            async deleteTask(){
                this.$emit('updateMenuVisibility', !this.isVisible);
                return await this.$store.dispatch('deleteTask', {taskID : this.taskID});
            },
            async updateCompleted(){
                this.$emit('updateMenuVisibility', !this.isVisible);
                return await this.$store.dispatch('updateCompleted', {taskID : this.taskID})
            },
            updateTaskMenuOpened(event){
                this.$emit('updateMenuVisibility', !this.isVisible);
                this.updateMenuPosition(event) 
            },
            showMenu(index) {
              this.activeMenu = index;
              this.updateMenuPosition(index);
            },
            updateMenuPosition(event) {
               this.pos = window.innerHeight - event.clientY;             
            }
        },
        watch:{
            adderIsVisible(newValue){
                this.$emit('updateMenuVisibility', this.isVisible ? !this.isVisible : this.isVisible);
            }
            
        },
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