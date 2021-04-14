<template>
    <div class="mb-1">
        <a-row type="flex">
            <a-col flex="auto">
                <a-avatar :size="50" icon="user"/>
            </a-col>
            <a-col class="name" :span="14">
                Capy BARA <br />
                <span class="small">a Day</span>
            </a-col>
            <a-col class="name text-right" :span="6">
                ฿2000 <br />
                <span class="small">฿20</span>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped>
.name{
    line-height: 25px;
    font-size: 20px;
}
.small{
    font-size: 12px;
    color: #aaa;
}
</style>
