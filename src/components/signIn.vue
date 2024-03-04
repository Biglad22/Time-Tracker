<template>
    <div>
        <h6 class="capitalize text-center mb-10">
            login
        </h6>
        <form class="flex flex-col gap-5 items-center">
            <inputField :required="true" :type="'email'" class="w-full" :placeholder="'enter email'" :entry="email" @inputEvent="updateEmail"/>
            <inputField :required="true" :type="'password'" class="w-full" :placeholder="'enter password'" :entry="pass"  @inputEvent="updatePass" />
            <div class="w-full">
                <Transition name="warn">
                    <p v-if="errorMsg !== null" class="text-[var(--danger-color)] text-left capitalize text-xs mb-3.5">{{ errorMsg }}</p>
                </Transition>
                <button type="submit" class="p-3.5 w-full text-[var(--text-h)] bg-[var(--primary-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--main-hover)] transition-all duration-500 " @click.prevent="signIn">
                    login
                </button>
            </div>
            <button type="reset" class="p-3.5 w-fit text-[var(--primary-color)] bg-transparent after:block after:content-[''] after:h-[0.2rem] after:w-0 hover:after:w-full after:absolute after:bottom-1.5 after:left-0 after:bg-[var(--primary-color)] relative  after:transition-all after:duration-500" @click.prevent="signupState">
                don't have an account
            </button>
        </form>
    </div>
</template>

<script>
import inputField from './input.vue';

export default {
    data(){
        return{
            email:null,
            pass:null,
        }
    },
    computed:{
        errorMsg(){
            return this.$store.state.authError;
        }
    },
    components:{
        inputField
    },
    methods:{
        updateEmail(newValue){
            this.email = newValue;
        },
        updatePass(newValue){
            this.pass = newValue;
        },
        signupState(){
            this.$emit('updateCanSignin', false)
        },
        async signIn(){
           await this.$store.dispatch('signIn', {email: this.email, pass: this.pass});
        },
    }
    

}
</script>

<style>
.warn-enter-active, .warn-leave-active{
    transition: all 0.5s;
    height: fit-content;
}
.warn-enter-from, .warn-leave-to{
    height: 0;
    overflow-y:hidden ;
    transition: all 0.5s;
}
</style>