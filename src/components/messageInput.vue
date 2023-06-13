<script lang="ts">
import { defineComponent } from 'vue';
import ApiService from '../services/apiService';
export default defineComponent({
    data(){
        return {
            apiService:new ApiService()
        }
    },
    created() {
        this.apiService.init(); 
    },
    methods:{
        submitMessage:function (e:Event){
            if(e){
                e.preventDefault()
            }
            const target:HTMLFormElement = e.target as HTMLFormElement;
            const elementKeys = Object.keys(target.elements) as Array<keyof HTMLFormControlsCollection>;
            const values = elementKeys.reduce((acc:any,key:keyof HTMLFormControlsCollection)=>{
                const element = target.elements[key] as HTMLFormElement 
                if(element.value || element.tagName === "textarea"){
                    acc[element.name || key] = element.value;
                }
                return acc;
            },{})  
            
            if(values.message){
                this.apiService.saveMessage({
                    message:values.message,
                    topic:"Vite",
                    timestamp:Date.now().toString()
                })         
            }
        }
    }
})

</script>

<template>
    <form @submit="submitMessage($event)">
        <label for="message">Message</label>
        <input name="message" type="text"/>
        <button>Submit</button>
    </form>
</template>