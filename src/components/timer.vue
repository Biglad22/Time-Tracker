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
    import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

    export default {
        components:{play, pause},
        props:[
            'start',
            'isTiming',
            'taskID',
            'isCompleted'
        ],
        data(){
            return{
                hour:null,
                mins:null,
                timerFunc:null,
                startTime:null,
                curTime:null,
                index: this.taskIndex
            }
        },
        created(){
            this.startTime = this.start === null ? 0 : this.start;

            const hours = Math.floor(this.startTime / (1000 * 60 * 60));
            const minutes = Math.floor((this.startTime % (1000 * 60 * 60)) / (1000 * 60));

            const padZero = number => {
              return (number < 10 ? '0' : '') + number;
            }

            this.hour = padZero(hours);
            this.mins = padZero(minutes);
        },
        methods:{

            async play(){

                await this.$store.dispatch('updateIsTiming', 
                {   
                    taskID : this.taskID,
                    isTiming : true
                });
                
                // const startPoint = new Date().getTime() 

                const padZero = number => {
                  return (number < 10 ? '0' : '') + number;
                }

                this.timerFunc =  setInterval(()=>{
                    // const curTime = new Date().getTime();
                    // let elapsedTime = curTime - startPoint;

                    let actualElapsedTime = 5000 + (this.start === null ? 0 : this.start);

                    let elapsedTime = actualElapsedTime - this.start;
                    this.$store.dispatch('graphDate',{
                        time: 5000
                    });

                    this.$store.dispatch('updateTime', {
                        elapsedTime : actualElapsedTime, 
                        taskID : this.taskID
                    });

                    

                    const hours = Math.floor(actualElapsedTime / (1000 * 60 * 60));
                    const minutes = Math.floor((actualElapsedTime % (1000 * 60 * 60)) / (1000 * 60));

                    this.hour = padZero(hours);
                    this.mins = padZero(minutes);

                    
                }, 5000);


                // this.startTime = startPoint;

            },
            async pause(){
                await this.$store.dispatch('updateIsTiming', 
                {   
                    taskID : this.taskID,
                    isTiming : false
                });

                clearInterval(this.timerFunc);
                
            },
        },
        watch:{
            isCompleted(newValue){
                return this.pause();
            },
            isTiming(newValue){
                return newValue ? this.pause() : this.play()
            }
        },
        async beforeDestroy(){
            await this.$store.dispatch('updateIsTiming', 
            {   
                taskID : this.taskID,
                isTiming : false
            }); 
        }
    }
</script>