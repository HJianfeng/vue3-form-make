<template>
  <div class="container">
    <el-container class="fm2-container">
      <el-aside width="250px">
        <leftSide />
      </el-aside>
      <el-container class="center-container" direction="vertical">
        <centerContainer />
      </el-container>
      <el-aside>
        <rightSide />
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
// import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import leftSide from '@/components/leftSide.vue';
import centerContainer from '@/components/container.vue';
import rightSide from '@/components/rightSide.vue';

export default {
  components: { leftSide, centerContainer, rightSide },
  setup: () => {
    const store = useStore();
    return { userInfo: store.state.userInfo };
  }
};
</script>

<style lang="scss">
.container {
  height: 100%;
}
.fm2-container {
  background: #fff;
  height: 100%;
}
.center-container {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
</style>
