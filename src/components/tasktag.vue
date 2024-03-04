<template>
    <div class="tag flex flex-wrap flex-row gap-1.5 items-center ps-0 sm:ps-3.5 p-3.5 opacity-80">
        <tasktag class=" bg-transparent" :tagColor="tagColor" />
        <p class="tag-name font-normal uppercase text-base opacity-80" :style="{color: tagColor !== null ? `${tagColor}` : 'var(--text-m)'}">
            <slot name="tag"></slot>
        </p>
    </div>
</template>
<script>
    import tasktag from '../assets/icons/tasktag.vue';

    export default{
        components:{
            tasktag
        },props:[
            'tagColor'
        ]
    }
</script>
