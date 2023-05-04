<template>
  <div class="container">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" v-model="password"/>
      </div>
      <button class="btn btn-info">Login</button>
    </form>
  </div>
</template>

<script>
export default{
  data(){
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login(){
      try{
        const actionPayload = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('login', actionPayload);
        this.$router.replace('/teams');
      }catch(error){
        this.error = error.message;
        console.log(this.error);
      }
    }
  }
}
</script>
