<template>
    <div class="mb-1 center">
        <h1 class="color_blue_bold">Account information</h1>
        <h2 class ="color_blue_bold">O debit</h2>
        <h4>Card Name</h4>
        <h2 class ="color_blue_bold">Saving account</h2>
        <h4>Account Type</h4>
        <h2 class ="color_blue_bold">1111 - 2222 -3333 -4444</h2>
        <h4>Account ID</h4>
         <a-row type="flex" justify="space-around">
            <a-col :span="8">
                <h2 class = color_blue_bold>09/29</h2>
            </a-col>
            <a-col :span="8">
                <h2  class = color_blue_bold>882</h2>
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-between">
            <a-col :span="8">
                <h4>Exp Data</h4>
            </a-col>
            <a-col :span="8">
                <h4>CCv</h4>
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-between">
            <a-col :span="8">
                <h4> Enable/Disable</h4>
            </a-col>
            <a-col :span="8">
                 <a-Switch defaultChecked/>
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
.thin{
    font-weight: thin;
}
.color_blue_bold{
    color:rgb(69,123,157);
    font-weight: bold;
}
.center{
  text-align: center;
}.margin{
    margin: 5px;
}
</style>
