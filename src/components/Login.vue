<template>
  <div>
    <!--<div class="">-->
      <!--<img src="../assets/img/banner.png" width="200" height="200"/>-->
    <!--</div>-->
    <el-form :rules="rules" class="login-container" label-position="left" label-width="0px" v-loading="loading">
    <div class="login_form">
      <el-form-item prop="account">
        <el-input type="text" v-model="username" placeholder="用户名" class="login-input tip" auto-complete="off" prefix-icon="icon-font el-icon-nblog-user"></el-input><br />
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="password" placeholder="密码" class="login-input" auto-complete="off" prefix-icon="icon-font el-icon-nblog-password"></el-input>
      </el-form-item>
      <div class="login-btn">
        <el-button type="primary" @click.native.prevent="submitClick">登录</el-button>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script>
import THREE from '@/utils/three.min'

let SEPARATION = 70,
  AMOUNTX = 80,
  AMOUNTY = 50;

let container;
let camera, scene, renderer;

let particles,
  particle,
  count = 0;

let mouseX = 85,
  mouseY = -342;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
export default {
  data(){
    return {
      rules: {
        account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      loading: false
    }
  },
  beforeCreate () {
    window.document.body.className = 'body'
  },
  beforeDestroy () {
    window.document.body.className = ''
  },
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    }
  },
  methods: {
    submitClick: function () {
      var _this = this;
      this.loading = true;
      postRequest('/login', {
        username: this.username,
        password: this.password
      }).then(resp=> {
        _this.loading = false;
        if (resp.status == 200) {
          //成功
          var json = resp.data;
          if (json.status == 'success') {
            _this.$router.replace({path: '/home'});
          } else {
            _this.$alert('登录失败!', '失败!');
          }
        } else {
          //失败
          _this.$alert('登录失败!', '失败!');
        }
      }, resp=> {
        _this.loading = false;
        _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
      });
    },
    init() {
      container = document.createElement("div");
      document.body.appendChild(container);
      camera = new THREE.THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      container.style.cssText = "position:fixed;top:0;left:0;opacity:0.9;z-index:10000";
      camera.position.z = 1000;

      scene =new THREE.THREE.Scene();

      particles = new Array();

      var PI2 = Math.PI * 2;
      var material =new THREE.THREE.ParticleCanvasMaterial({
        color: 0xe1e1e1,
        program: function(context) {
          context.beginPath();
          context.arc(0, 0, 0.6, 0, PI2, true);
          context.fill();
        }
      });

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.THREE.Particle(material);
          particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
          particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
          scene.add(particle);
        }
      }

      renderer =new THREE.THREE.CanvasRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener("mousemove", this.onDocumentMouseMove, false);
      document.addEventListener("touchstart", this.onDocumentTouchStart, false);
      document.addEventListener("touchmove",this. onDocumentTouchMove, false);

      //

      window.addEventListener("resize", this.onWindowResize, false);
    },
    onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    },
    onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    },
    onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.render();
    },
    render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2;
        }
      }

      renderer.render(scene, camera);

      count += 0.1;
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
};

</script>

<style>
  .el-input--prefix .el-input__inner {
    padding-left: 34px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .bannerImg{
    width: 200px;
    height: 200px;
  }
  .login_form{
    position: relative;
    z-index: 1000000;
    top:350px;
  }
  .login-input{
    width:400px;
  }
  .login-input input{
    background-color: initial;
    border: none;
    color: #ffffff;
    font-size: 18px;
    line-height: 60px;
  }
  .login-input.tip{
    border-bottom: #ffffff solid 1px;
    width: 400px;
  }
  .login-btn button{
    width: 350px;
    height: 48px;
    font-size: 18px;
    color: #FFF;
    background-color: inherit;
    margin-top: 50px;
    border:#FFFFFF solid 1px;
  }
  .login-btn button:hover,.login-btn button:active,.login-btn button:visited{
    color: #FFF;
    font-weight: bold;
    background-color: inherit;
    border:#FFFFFF solid 2px;
  }
  .login-btn button:focus{
    color: #FFF;
    font-weight: initial;
    background-color: inherit;
    border:#FFFFFF solid 1px;
  }
  input::input-placeholder{
    color:#FFFFFF!important;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #FFFFFF!important;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #FFFFFF!important;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #FFFFFF!important;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #FFFFFF!important;
  }
</style>
