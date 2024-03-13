<template>
  <div class=" box-border body-container " v-cloak>

    <div v-if="isLoading" class="loader text-[var(--tertiary-color)] h-full w-full font-semibold animate-pulse relative">
      <h5 class="capitalize w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {{ loadMsg }}
      </h5>
    </div>
    <div v-else class="main-page relative  h-full max-h-full box-border ">
      <Transition name="signin" >
        <div class="body-container h-full max-w-full  bg-clip-border" v-if="user === null">
          <signIn v-if="canSignin" @updateCanSignin="canSigninUpadated" class="w-5/6 sm:w-1/2 md:w-2/5 lg:w-[30rem] p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
          <signUp v-else  @updateCanSignin="canSigninUpadated" class="w-5/6 sm:w-1/2 md:w-2/5 lg:w-[30rem] p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>
      </Transition>

      <Transition name="connectivity" >
        <connectivityCard class="absolute right-[8px] bottom-[8px]   z-50" :isConnected="isConnected" v-show="connectionState">
          <template v-slot:main-msg >{{ connectMainMsg }}</template>
          <template v-slot:sec-msg >{{ connectSecMsg }}</template>
        </connectivityCard>
      </Transition>

      <div class="relative max-h-full h-full min-h-[50vh] " v-if="user !== null">

        <div class=" w-fit h-fit left-1/2 -translate-x-1/2 md:translate-x-0 md:h-full md:w-fit fixed top-[var(--nav-pos)] md:left-[var(--nav-pos)] z-50">
          <navbar :curPath="$route.path" />
        </div>

        <div class=" h-full max-h-full ml-0 md:ml-[200px] pt-[62px] md:pt-0 overflow-y-scroll  md:h-full min-h-[50vh]   box-border relative">
          <RouterView ></RouterView>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import signIn from './components/signIn.vue'
import signUp from './components/signup.vue'
import { RouterLink, RouterView } from 'vue-router';
import { Transition } from 'vue';
import navbar from './components/navbar.vue';
import { mapGetters } from 'vuex';
import connectivityCard from './components/connectivityCard.vue';
export default {
  components:{
    signIn,
    signUp,
    RouterView,
    navbar,
    connectivityCard
  },
  data(){
    return{
      canSignin:true,
      online:navigator.onLine,
      loadMsg:'loading...',

      connectMainMsg : '',
      connectSecMsg : '',
      connectionState: false,
      isConnected: true
    }
  },
  computed:{
    ...mapGetters(['isLoading','saved']),
    user(){
      return this.$store.state.userId
    },
  },
  watch:{
    saved(newValue, oldValue){
      this.updateOnlineStatus();
    }
  },
  methods:{
    canSigninUpadated(newValue){
      this.canSignin = newValue;
    },
    async updateOnlineStatus(){
      this.online = navigator.onLine;

      if(!this.online){
        
        this.isConnected = false;

        this.connectMainMsg = 'you’re working offline';
        this.connectSecMsg = 'please check your internet connection to sync data';

        this.connectionState = true;

        const warningCallBck = setTimeout(() => {
          this.connectionState = false;

          clearTimeout(warningCallBck);

        }, 5000);

        window.addEventListener('beforeunload', function(event) {

          // Cancel the event
          event.preventDefault();
          // Chrome requires returnValue to be set
          event.returnValue = '';
              
          
          const confirmationMessage = 'progress made will not be saved if you leave?';

          event.returnValue = confirmationMessage; 

          return confirmationMessage; 

        });


      }else{

        this.connectionState = true;

        let isSaved = this.saved;
        this.isConnected = true;

        switch(this.saved){
          case false:
            this.connectMainMsg = 'oti wa online now';
            this.connectSecMsg = 'all progress will be saved';

            const warningCallBck = setTimeout(() => {
              this.connectMainMsg = 'syncing data...';
              this.connectSecMsg = 'all progress are being saved';

              clearTimeout(warningCallBck);

            }, 3000);

            break;

          case true:
            this.connectMainMsg = 'oti wa online now';
            this.connectSecMsg = 'all progress will be saved';

            const secWarningCallBck = setTimeout(() => {
              this.connectMainMsg = 'syncing data...';
              this.connectSecMsg = 'all progress are being saved';

              clearTimeout(secWarningCallBck);

            }, 3000);

            const newTimeOut = setTimeout(()=>{
              this.connectMainMsg = 'sync complete';
              this.connectSecMsg = 'all progress have been saved';

              clearTimeout(newTimeOut);

              const thrWarningCallBck = setTimeout(() => {

                this.connectionState = false;

                clearTimeout(thrWarningCallBck);

              }, 5000);
            }, 3500);

            break;
        }

        
      }

      await this.$store.commit('setNetwork', this.online);
    },
    async updateServer(){
      await this.$store.dispatch('updateServer', {pass : navigator.onLine});

      this.$store.dispatch('onAuthStateChanged');

      await this.updateOnlineStatus();
    },
    changeLoader(){
      if (this.isLoading){
        this.loadMsg = 'loading...'
        const myCallBck = setTimeout(
          ()=>{
            this.loadMsg = 'please check your internet connection';

            clearTimeout(myCallBck)

          }, 60000
        )
      
      }else{
        this.loadMsg = `done`;
      }
    }
  },
  mounted(){
    
    this.changeLoader();

    this.$store.dispatch('onAuthStateChanged');

    //check if user is back online
    window.addEventListener('online', this.updateServer);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateServer);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
}
</script>
<style>
.signin-enter-active, .signin-leave-active{
  transition: all 0.5s ease-in-out;
}
.signin-enter-from, .signin-leave-to{
  transform: translateY(-120%);
}

.connectivity-enter-active, .connectivity-leave-active{
  transition: all 1s ease-in-out;
  opacity: 1;
  transform: translateX(0);
}
.connectivity-enter-from, .connectivity-leave-to{
  transform: translateX(20px);
  opacity: 0.1;
}

.main-wrapper {
  height: 100%;
  max-height: 100%;
}
</style>