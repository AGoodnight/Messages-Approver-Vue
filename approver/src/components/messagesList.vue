<script lang="ts">
import { defineComponent } from "vue";
import ApiService, { Message } from "../services/apiService";

export default defineComponent({
  data(){
    return {
      apiService:new ApiService(),
      messages:[] as Message[]
    }
  },
  created(){
    this.apiService.init();
    this.apiService.messages$.subscribe((messages:Message[])=>{
      this.messages = messages;
    })
  }
})

</script>

<template>
  <table>
    <th>
      <td>Message</td>
      <td>
        <small>
          Topic
        </small>
      </td>
      <td>
        <small>
          Time Saved
        </small>
      </td>
    </th>
    <tr v-if="messages.length > 0" v-for="message in messages">
      <td>
        <small>{{ message.id }}</small>
      </td>
      <td>
        {{message.message}}
      </td>
      <td>
        <small>
          {{message.topic}}
        </small>
      </td>
      <td>
       <small>
          {{message.timestamp}}
        </small>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
