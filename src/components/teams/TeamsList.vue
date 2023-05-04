<template>
  <router-view></router-view>
  <ul>
    <p v-if="error">{{ error }}</p>
    <teams-item
      v-for="course in courses"
      :key="course.id"
      :id="course.id"
      :name="course.name"
      :description="course.description"
    ></teams-item>
  </ul>
</template>

<script>
import TeamsItem from './TeamsItem.vue';
import axios from 'axios';

export default {
  components: {
    TeamsItem,
  },
  data(){
    return {
      courses: [],
      error: null
    }
  },
  // inject: ['teams'],
  provide(){
    return {
      courses: this.courses
    }
  },
  methods: {
    async getTeamsData(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/courses',{
          headers: {'Authorization': 'Bearer '+ this.$store.state.token}
        });
        // console.log(response.data.data);
        // for(let i=0; i<response.data.data.length; i++){
        //   this.courses.push(response.data.data[i])
        // }
        this.courses = response.data.data;
        console.log(this.courses);
      }catch(error){
        this.error = error.message;
      }
    }
  },
  mounted(){
    this.getTeamsData();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>