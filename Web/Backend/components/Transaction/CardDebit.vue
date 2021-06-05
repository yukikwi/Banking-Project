<template>
  <div class="card mb-1 pl-1 pr-1 rounded-m" @click="$router.push('transfer/slip/'+transactionData['Trans_ID'])">
    <div v-if="transactionData['User_Sender_Internal_AccountID'] === cardId">
      <a-row>
        <a-col :span="12">
          <h2 v-if="transactionData['User_Target_External_AccountID'] !== null">
            {{ transactionData['User_Target_External_AccountID'] }}
          </h2>
          <h2 v-else-if="transactionData['User_Target_Internal_AccountID'] !== null">
            {{ transactionData['User_Target_Internal_AccountID'] }}
          </h2>
          <h2 v-else-if="transactionData['User_Target_Bill_ID'] !== null">
            Bill {{ transactionData['User_Target_Bill_ID'] }}
          </h2>
          <h2 v-else>
            Unknow
          </h2>
          <!-- Money go out -->
          <span>{{ transactionData.Time }}</span>
        </a-col>
        <a-col :span="12">
          <h2 class="money red">
            - {{ transactionData.Trans_Amount + transactionData.Trans_Fee }}
          </h2>
        </a-col>
      </a-row>
    </div>
    <div v-if="transactionData['User_Target_Internal_AccountID'] === cardId">
      <a-row>
        <a-col :span="12">
          <h2 v-if="transactionData['User_Sender_External_AccountID'] !== null">
            {{ transactionData['User_Sender_External_AccountID'] }}
          </h2>
          <h2 v-else-if="transactionData['User_Sender_Internal_AccountID'] !== null">
            {{ transactionData['User_Sender_Internal_AccountID'] }}
          </h2>
          <h2 v-else>
            Unknow
          </h2>
          <!-- Money go in -->
          <span>{{ transactionData.Time }}</span>
        </a-col>
        <a-col :span="12">
          <h2 class="money green">
            + {{ transactionData.Trans_Amount }}
          </h2>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transactionData: {
      type: Object,
      default () {
        return {}
      }
    },
    cardId: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.name{
  line-height: 25px;
  font-size: 20px;
}
.small{
  font-size: 12px;
  color: #aaa;
}
.card{
  background-color: #D4EBEC;
}
.money{
  line-height: 62.5px;
  margin-bottom: 0;
  text-align: right;
}
.green{
  color: #26A400;
}
.red{
  color: #A40000;
}
</style>
