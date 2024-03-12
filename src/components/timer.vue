<template>
    <div class="flex flex-wrap flex-row items-center">
        <p class="p-3.5 ps-0 sm:ps-3.5 pe-0" :class="isTiming ? 'text-[var(--text-h)]' : 'text-[var(--text-m)]'">
             {{ hour !== null ? hour : '00'  }} : {{ mins !== null ? mins : '00' }}
        </p>

        <button v-if="!isTiming" type="button" @click="play" class="p-3.5 w-fit h-fit bg-transparent border-0">
            <play class="w-[2.0rem] md:w-[2.4rem] h-auto" :stroke="'var(--boring-btn)'"/>
        </button>
        <button v-else @click="pause" type="button" class="p-3.5 w-fit h-fit bg-transparent border-0">
            <pause class="w-[2.0rem] md:w-[2.4rem] h-auto" :isTiming="isTiming" :stroke="'var(--boring-btn)'" />
        </button>
    </div>
</template>
<script>
    import play from '../assets/icons/play.vue';
    import pause from '../assets/icons/pause.vue';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        components:{play, pause},
        props:[
            'start',
            'taskID',
            'isCompleted',
        ],
        data(){
            return{
                timerFunc:null,
                startTime:null,
                curTime:null,
                
            }
        },
        computed:{
            ...mapGetters(['timerState', 'taskTime']),
            hour(){
                const hours = Math.floor(this.taskTime(this.taskID) / (1000 * 60 * 60));
                return this.padZero(hours);
            },
            mins(){
                const minutes = Math.floor((this.taskTime(this.taskID) % (1000 * 60 * 60)) / (1000 * 60));
                return this.padZero(minutes);
            },
            isTiming(){
                return this.timerState(this.taskID);
            }
        },
        methods:{
            ...mapActions(['startTimer', 'pauseTime']),

            padZero(number){
              return (number < 10 ? '0' : '') + number;
            },

            async play(){

                if ( !this.$store.state.playingTimer[this.taskID].isTiming){
                    this.startTimer({taskID : this.taskID, start : this.start});
                }else{
                    //do nothing
                }

            },
            pause(){
                this.pauseTime(this.taskID);
            },
        }
        // watch:{
        //     isCompleted(newValue){
        //         return this.pause();
        //     },
        //     isTiming(newValue){
        //         return newValue ? this.pause() : this.play()
        //     }
        // }
    }
</script>