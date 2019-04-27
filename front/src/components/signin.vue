<template>
  <div>
    <form>
      <div class="form-group">
        <label for="login">You login</label>
        <input type="text" name="login" v-model="login" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">You password</label>
        <input type="password" name="password" v-model="password" class="form-control">
      </div>
      <input type="submit" @click="logins" class="btn btn-primary">
      <router-link to="/" class="link">Sign up</router-link>

      <div
        class="alert"
        v-bind:class="{ 'alert-success': active, 'alert-danger': iserror }"
        role="alert"
      >{{status}}</div>
    </form>
  </div>
</template>
<script>
import VueSession from "vue-session";
import axios from "axios";
export default {
  data() {
    return {
      login: "",
      password: "",
      status: null,
      active: false,
      iserror: false
    };
  },
  methods: {
    logins(e) {
      e.preventDefault();
      const log = {
        login: this.login,
        password: this.password
      };
      if (this.login != "" && this.password) {
        axios({
          method: "post",
          url: "http://localhost:3000/login",
          data: log
        }).then(response => {
          this.$session.start();
          if (response.data.code != 401) {
            console.log(response);

            this.$session.set("login", response.data.login);
            this.$session.set("full_name", response.data.full_name);
            this.status = "success";
            this.active = true;
            this.iserror = false;
            this.$router.push("/profil");
          } else {
            this.status = "Unauthorized";
            this.iserror = true;
            this.active = false;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.alert {
  margin-top: 20px;
}
.link {
  padding-left: 10px;
}
</style>


