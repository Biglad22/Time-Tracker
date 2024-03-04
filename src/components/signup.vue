<template>
    <div>
        <h6 class="capitalize text-center mb-10">
            signup
        </h6>
        <form class="flex flex-col gap-7 items-center">
            <inputField :required="true" :type="'email'" class="w-full"  :placeholder="'enter your email'" :entry="email" @inputEvent="updateEmail"/>
            <div class="w-full">
                <inputField :required="true" :type="'password'" class="w-full" :entry="pass" :placeholder="'create password'"   @inputEvent="updatePass" @blur="passCheck"/>
                <Transition name="warn">
                    <ul v-if="goodPass !== null && goodPass === false" class=" list-disc ms-7 mt-3.5 font-thin capitalize text-xs">
                        <li>
                            password must be atleast 8 characters
                        </li>
                        <li>
                            must include both upperCase and lower letters
                        </li>
                        <li>
                            must include atleast 1 number, special character ( '&lt;`~!@#$%^&*()_-,=+{[;:"'\|&gt;.?/\|'"]} ) or space
                        </li>
                    </ul>
                </Transition>
            </div>
            <div class="w-full">
                <inputField :required="true" :type="'password'" class="w-full" :entry="comPass" :placeholder="'comfirm password'"  @inputEvent="updateComPass" @keyup="passCom"/>
                <Transition name="warn">
                    <p v-if="warning !== null" class="text-[var(--danger-color)] text-left capitalize text-xs mt-3.5">{{ warning }}</p>
                </Transition>
            </div>
            <button type="submit" @click.prevent="signUp" class="p-3.5 w-full text-[var(--text-h)] bg-[var(--primary-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--main-hover)] transition-all duration-500">
                create account
            </button>
            <button type="button" class="p-3.5 w-fit text-[var(--primary-color)] bg-transparent after:block after:content-[''] after:h-[0.2rem] after:w-0 hover:after:w-full after:absolute after:bottom-1.5 after:left-0 after:bg-[var(--primary-color)] relative  after:transition-all after:duration-500" @click="signupState">
                i have an account
            </button>
        </form>
    </div>
</template>
<script>
import inputField from './input.vue';
import { Transition } from 'vue';

export default {
    components:{
        inputField
    },
    data(){
        return{
            comPass:'',
            email:'',
            pass:'',
            goodPass:null,
            passMatch:false
        }
    },
    computed:{
        warning(){
            return this.$store.state.authError;
        }
    },
    methods:{
        updateEmail(newValue){
            this.email = newValue;
        },
        updatePass(newValue){
            this.pass = newValue;
        },
        updateComPass(newValue){
            this.comPass = newValue;
        },
        signupState(){
            this.$emit('updateCanSignin', true)
        },
        passCheck(){
            // Regular expressions to check for uppercase, special character, and number
            const uppercaseRegex = /[A-Z]/;
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            const numberRegex = /[0-9]/;

            // Check if password meets the criteria
            const hasUppercase = uppercaseRegex.test(this.pass);
            const hasSpecialChar = specialCharRegex.test(this.pass);
            const hasNumber = numberRegex.test(this.pass);

            // Return true if all criteria are met, false otherwise
            this.goodPass = (hasUppercase && hasSpecialChar) || (hasNumber && hasUppercase) ? true : false;

            //check if passwords match
            this.passCom();
        },
        passCom(){
            this.pass === this.comPass && this.comPass !== '' ? ( this.passMatch = true): (  this.passMatch = false); 
        },
        async signUp(){
            await this.$store.dispatch('signUp',{
                email: this.email, 
                pass: this.pass,
                goodPass: this.goodPass, 
                passMatch: this.passMatch,
            });

        }
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