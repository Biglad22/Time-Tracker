<template>
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.36364C1 2.95367 2.95367 1 5.36364 1H9.72727C12.1372 1 14.0909 2.95367 14.0909 5.36364V9.72727C14.0909 12.1372 12.1372 14.0909 9.72727 14.0909H5.36364C2.95367 14.0909 1 12.1372 1 9.72727V5.36364Z" :style="{stroke : active ? 'var(--primary-color)' : 'var(--text-h)' }" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 24.2727C1 21.8628 2.95367 19.9091 5.36364 19.9091H9.72727C12.1372 19.9091 14.0909 21.8628 14.0909 24.2727V28.6364C14.0909 31.0463 12.1372 33 9.72727 33H5.36364C2.95367 33 1 31.0463 1 28.6364V24.2727Z" :style="{stroke : active ? 'var(--primary-color)' : 'var(--text-h)' }" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.9091 5.36364C19.9091 2.95367 21.8628 1 24.2727 1H28.6364C31.0463 1 33 2.95367 33 5.36364V9.72727C33 12.1372 31.0463 14.0909 28.6364 14.0909H24.2727C21.8628 14.0909 19.9091 12.1372 19.9091 9.72727V5.36364Z" :style="{stroke : active ? 'var(--primary-color)' : 'var(--text-h)' }" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.9091 24.2727C19.9091 21.8628 21.8628 19.9091 24.2727 19.9091H28.6364C31.0463 19.9091 33 21.8628 33 24.2727V28.6364C33 31.0463 31.0463 33 28.6364 33H24.2727C21.8628 33 19.9091 31.0463 19.9091 28.6364V24.2727Z" :style="{stroke : active ? 'var(--primary-color)' : 'var(--text-h)' }" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>
<script>
export default{
    props:[
        'active'
    ]
}
</script>