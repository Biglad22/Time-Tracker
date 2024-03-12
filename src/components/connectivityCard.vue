<template>
    <div class=" px-[16px] py-[8px] rounded w-fit text-center" :class=" isConnected ? 'bg-[#E7E5FF]' : 'bg-[#FFE7E7]' " >
      <p class="capitalize  w-full text-center" :class=" isConnected ? 'text-[#1401F9]' : 'text-[#D10000]' ">
        <slot name="main-msg"></slot>
      </p>
      <small class=" capitalize text-[var(--text-light-m)] mt-2 block w-fit">
         <slot name="sec-msg"></slot>
      </small>
    </div>
</template>
<script>
    export default{
        props:[
            'isConnected'
        ]
    }
</script>