<template>
  <div>
    {{login }} {{full_name}}
    <button @click="exit">exit</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      login: "",
      full_name: ""
    };
  },
  methods: {
    exit() {
      axios({
        method: "post",
        url: "http://localhost:3000/logout"
      }).then(res => {
        console.log(res.status);
        if (res.status == 200) {
          this.$session.destroy();
          this.$router.push("/signin");
        }
      });
    }
  },
  computed: {
    load() {
      this.login = this.$session.get("login");
      this.full_name = this.$session.get("full_name");
    }
  }
};
</script>

