<template>
  <div class="config">
    <el-form v-if="selectWidget && propsConfig[selectWidget.type]" label-position="top">
      <template
        v-for="(prop, index) in handelProps(propsConfig[selectWidget.type], selectWidget.type)"
        :key="index"
      >
        <el-form-item v-if="!prop.link || handelData(selectWidget, prop.link)" :label="prop.label">
          <template v-if="prop.type === 'input'">
            <el-input
              v-if="prop.parentkey"
              v-model="selectWidget[prop.parentkey][prop.key]"
              v-bind="prop.bind"
              size="small"
            />
            <el-input v-else v-model="selectWidget[prop.key]" v-bind="prop.bind" size="small" />
          </template>

          <el-input-number
            v-if="prop.type === 'input-number'"
            v-model="selectWidget.options[prop.key]"
            v-bind="prop.bind"
            size="small"
          />

          <template v-if="prop.type === 'attr'">
            <el-checkbox
              v-for="item in prop.options"
              :key="item.keyName"
              v-model="selectWidget.options[item.key]"
            >
              {{ item.keyName }}
            </el-checkbox>
          </template>

          <el-radio-group
            v-if="prop.type === 'radio'"
            v-model="selectWidget.options[prop.key]"
            size="small"
          >
            <el-radio-button v-for="(i, j) in prop.options" :key="j" :label="i.key">
              {{ i.name }}
            </el-radio-button>
          </el-radio-group>

          <inputOptions v-if="prop.type === 'options'" :prop="prop" :select-widget="selectWidget" />

          <el-switch v-if="prop.type === 'switch'" v-model="selectWidget.options[prop.key]" />
          <el-color-picker
            v-if="prop.type == 'color'"
            v-model="selectWidget.options[prop.key]"
            :show-alpha="selectWidget.options.showAlpha"
          />
          <el-select
            v-if="prop.type === 'select'"
            v-model="selectWidget.options[prop.key]"
            size="small"
          >
            <el-option
              v-for="item in prop.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <gridOptions v-if="prop.type === 'grid'" :prop="prop" :select-widget="selectWidget" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { propsConfig } from '../componentsConfig';
import inputOptions from './inputOptions.vue';
import gridOptions from './gridOptions.vue';

export default {
  components: { inputOptions, gridOptions },
  setup() {
    const store = useStore();
    const selectWidget = computed(() => {
      return store.state.selectWidget;
    });
    const handelProps = (arr: any, type: string) => {
      const head = propsConfig.common.head || [];
      if (type === 'grid') return arr;
      return head.concat(arr);
    };
    const handelData = (data: any, link: string) => {
      const isNegative = link.indexOf('!') === 0;
      link = isNegative ? link.replace('!', '') : link;
      return isNegative ? !data.options[link] : data.options[link];
    };
    return {
      propsConfig,
      selectWidget,
      handelProps,
      handelData
    };
  }
};
</script>

<style lang="scss">
.config {
  .el-form-item__label {
    line-height: 30px;
    padding: 0;
  }
  .el-form-item__content {
    line-height: 32px;
  }
}
</style>
