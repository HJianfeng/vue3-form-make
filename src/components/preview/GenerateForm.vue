<template>
  <div class="fm-style">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="widgetData.config.size"
      :model="models"
      :label-position="widgetData.config.labelPosition"
      :label-width="widgetData.config.labelWidth + 'px'"
    >
      <template v-for="item in widgetData.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type == 'blank'"
                  :key="citem.key"
                  :label="citem.name"
                  :prop="citem.model"
                >
                  <slot :name="citem.model" :model="models" />
                </el-form-item>
                <genetate-form-item v-else :key="citem.key" :models="models" :widget="citem" />
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :key="item.key" :label="item.name" :prop="item.model">
            <slot :name="item.model" :model="models" />
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item :key="item.key" :models="models" :widget="item" />
        </template>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import GenetateFormItem from './GenerateFormItem.vue';

export default {
  components: {
    GenetateFormItem
  },
  setup() {
    const models = ref<any>({});
    const store = useStore();
    const widgetData = store.state.widgetData;
    const getModels = (list: any[]) => {
      list.forEach(i => {
        if (i.type === 'blank') {
          const defaultType = i.options.defaultType;
          models.value[i.model] =
            defaultType === 'String' ? '' : defaultType === 'Object' ? {} : [];
        } else {
          models.value[i.model] = i.options.defaultValue;
        }
      });
    };
    getModels(widgetData.list);

    const getData = () => {
      return models.value;
    };
    const reset = () => {
      for (const key of Object.keys(models.value)) {
        models.value[key] = '';
      }
    };
    return {
      widgetData,
      models,
      getData,
      reset
    };
  }
};
</script>

<style lang="scss"></style>
