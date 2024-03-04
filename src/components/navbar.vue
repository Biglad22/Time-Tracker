<template>
    <div class="px-0 md:px-3.5 py-7 bg-transparent md:bg-[var(--nav)] rounded-md flex flex-wrap flex-row gap-1 sm:gap-3.5 md:gap-7 md:flex-col justify-center ">
        <RouterLink to="/" class="p-3.5 flex flex-wrap items-center rounded-md hover:bg-[var(--text-dark-l)] transition-all duration-500 gap-3.5">
            <Clock :active="curPath === '/' ? true : false" class="w-[16px] sm:w-[20px] md:w-[24px]"/> 
            <p class=" uppercase hidden md:block" :class="curPath === '/' ? 'text-[var(--primary-color)]' : 'text-[var(--text-h)]' " >
                time tracker
            </p>
        </RouterLink> 
        <RouterLink to="/dashboard" class="p-3.5 flex flex-wrap items-center gap-3.5 rounded-md transition-all duration-500 hover:bg-[var(--text-dark-l)]">
            <Dash :active="curPath === '/dashboard' ? true : false" class="w-[16px] sm:w-[20px] md:w-[24px]"/> 
            <p class=" uppercase hidden md:block" :class="curPath === '/dashboard' ? 'text-[var(--primary-color)]' : 'text-[var(--text-h)]' " >
                dashboard
            </p>
        </RouterLink>  
        <button type="button" @click="logOut" class="p-3.5 flex flex-wrap items-center gap-3.5 rounded-md transition-all duration-500 hover:bg-[var(--text-dark-l)] group">
            <Logout class="w-[16px] sm:w-[20px] md:w-[24px] "/>
            <p class=" uppercase hidden md:block">log out</p>
        </button> 
    </div>
</template>
<script>
    import Clock from '@/assets/navicons/clock.vue';
    import Dash from '@/assets/navicons/dash.vue';
    import { RouterLink } from 'vue-router';
    import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

    import Logout from '@/assets/navicons/logout.vue'

    export default{
        components:{
            Dash,
            Clock,
            Logout
        },
        props:[
            'curPath'
        ],
        methods:{
            logOut(){
                this.$store.dispatch('logOut')
            }
        }
    }
</script>
<style scoped>

</style>