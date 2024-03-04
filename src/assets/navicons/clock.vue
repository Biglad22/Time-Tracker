<template>
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 6.33333V17H25M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17Z" :style="{stroke : active ? 'var(--primary-color)' : 'var(--text-h)' }" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>
<script>
export default{
    props:['active']
}
</script>