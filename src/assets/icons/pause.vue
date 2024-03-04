<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="heroicons-outline/pause">
        <path id="Vector" d="M15.75 5.25L15.75 18.75M8.25 5.25V18.75" :style="{stroke: isTiming ? 'var(--primary-color)' : stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</template>
<script>
export default {
    props:[
        'stroke',
        'isTiming'
    ]
}
</script>
