<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.name"
        :email="member.email"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from "../users/UserItem.vue";
import axios from "axios";

export default {
  components: {
    UserItem,
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  inject: ["teams", "users"],
  data() {
    return {
      teamName: "",
      members: [],
      error: null,
    };
  },
  methods: {
    // loadMemberData(teamId) {
    //   const team = this.teams.find((team) => team.id === teamId);
    //   this.teamName = team.name;
    //   this.members = this.users.filter((user) =>
    //     team.members.includes(user.id)
    //   );
    // },
    async loadMemberData(teamId) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/courses/" + teamId + "/users",
          {
            headers: { Authorization: "Bearer " + this.$store.state.token },
          }
        );
        this.teamName = response.data.data.courseName;
        this.members = response.data.data.users;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  created() {
    this.loadMemberData(this.teamId);
  },
  watch: {
    teamId() {
      this.loadMemberData(this.teamId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
