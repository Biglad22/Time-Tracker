<template>
    <div class="relative">
        <input :type="dblType" :value="entry" :required="required" @blur="$emit('blur')" :placeholder="placeholder" @input="updateParent($event)" @keyup="$emit('keyup')" class="p-3.5 w-full placeholder:text-[var(--text-l)] border-2 border-[var(--text-m)] focus:outline-none focus:border-[var(--primary-color)] placeholder:capitalize bg-transparent caret-[var(--primary-color)] transition-all duration-500">
        <button type="button" @click="doubleClick" class="absolute w-fit h-fit py-1 ps-3.5 font-medium pe-0 right-3.5 rounded-sm bg-[var(--background-color)] top-1/2 -translate-y-1/2 z-10 transition-all duration-500" v-if="type === 'password'">
           <span class=" text-xs">
            {{ state }}
           </span>
        </button>
    </div>
</template>

<script>
export default {
    props:[
        'type',
        'entry',
        'placeholder',
        'required'
    ],
    data(){
        return{
            dblType:null,
            state:'show',
        }
    },
    created(){
        this.dblType = this.type
    },
    methods:{
        updateParent(event){
            this.$emit('inputEvent',event.target.value);
        },
        doubleClick(){
            if( this.type === 'password' ){
                this.dblType =  this.dblType === 'password' ? 'text' : 'password';
                this.state = this.state === 'show' ? 'hide' : 'show'; 
            }else{
                /*DO NOTHING*/
            }
        }
    }

}
</script>