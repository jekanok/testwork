<template>
  <div>
    <form>
      <div class="form-group">
        <label for="login">You login:</label>
        <input
          type="text"
          name="login"
          placeholder="login"
          v-model="login"
          required
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="login">You full name:</label>
        <input
          type="text"
          placeholder="fullname"
          name="fullname"
          v-model="fullname"
          class="form-control"
          required
        >
      </div>
      <div class="form-group">
        <label for="login">You password:</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          v-model="password"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="login">Repeat password:</label>
        <input
          type="password"
          placeholder="repeat password"
          name="epassword"
          v-model="epassword"
          class="form-control"
        >
      </div>
      <input type="submit" value="Register" @click="register" class="btn btn-primary">
      <router-link to="/signin" class="link">Sign in</router-link>
      <div
        class="alert"
        v-bind:class="{ 'alert-success': active, 'alert-danger': iserror }"
        role="alert"
      >{{error}}</div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      login: "",
      fullname: "",
      password: "",
      epassword: "",
      error: "",
      active: false,
      iserror: false
    };
  },
  methods: {
    register(e) {
      e.preventDefault();
      const userProf = {
        login: this.login,
        password: this.password,
        full_name: this.fullname
      };
      if (this.password === this.epassword) {
        axios({
          method: "post",
          url: "http://localhost:3000/register",
          data: userProf
        }).then(res => {
          if (res.data.code === 422) {
            this.error = res.data.detail.login[0];
            this.iserror = true;
            this.active = false;
          } else {
            this.error = "success";
            this.active = true;
            this.iserror = false;
            this.$router.push("/signin");
          }
        });
      } else {
        this.error = "password is not correct";
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


