<template>
  <div class=" max-h-[100vh h-[100vh] box-border body-container overflow-y-hidden" v-cloak>

    <Transition name="signin" v-if="user === null">
      <div class="body-container h-full  bg-clip-border" >
        <signIn v-if="canSignin" @updateCanSignin="canSigninUpadated" class="w-5/6 sm:w-1/2 md:w-2/5 lg:w-[30rem] p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        <signUp v-else  @updateCanSignin="canSigninUpadated" class="w-5/6 sm:w-1/2 md:w-2/5 lg:w-[30rem] p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
    </Transition>

    <!-- FIXME -->
    <div class="relative h-full" v-if="user !== null">
      <div class=" w-fit h-fit left-1/2 -translate-x-1/2 md:translate-x-0 md:h-full md:w-fit fixed top-[var(--nav-pos)] md:left-[var(--nav-pos)] z-50">
        <navbar :curPath="$route.path" />
      </div>
      <div class="ml-0 md:ml-[200px] mt-[100px] md:mt-0 h-full  max-h-full overflow-y-hidden box-border relative">
        <RouterView ></RouterView>
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


export default {
  components:{
    signIn,
    signUp,
    RouterView,
    navbar
  },
  data(){
    return{
      canSignin:true,
    }
  },
  computed:{
    user(){
      return this.$store.state.userId
    }
  },
  methods:{
    canSigninUpadated(newValue){
      this.canSignin = newValue;
    }
  },
  created(){
    return this.$store.dispatch('onAuthStateChanged');
  },
}
</script>
<style>
.signin-enter-active, .signin-leave-active{
  transition: all 0.5s ease-in-out;
}
.signin-enter-from, .signin-leave-to{
  transform: translateY(-120%);
}
</style>