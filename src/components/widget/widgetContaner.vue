<template>
  <div style="padding: 10px; height: 100%">
    <div class="widget-form-container" @click="handleWidgetAdd">
      <div v-if="widgetDataList.length == 0" class="form-empty">从左侧拖拽来添加字段</div>
      <el-form
        class="widget-form"
        :size="widgetDataConfig.size"
        label-suffix=":"
        :label-position="widgetDataConfig.labelPosition"
        :label-width="widgetDataConfig.labelWidth + 'px'"
      >
        <draggable
          v-model="widgetDataList"
          item-key="name"
          tag="div"
          :component-data="{ class: 'widget-list' }"
          v-bind="{ group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget' }"
          @add="handleWidgetAdd"
        >
          <template #item="{ element, index }">
            <div>
              <WidgetGrid v-if="element.type == 'grid'" :pindex="index" :element-parent="element" />
              <WidgetFormItem v-else :element="element" :index="index" />
            </div>
          </template>
        </draggable>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import _ from 'lodash';
import WidgetFormItem from './widgetFormItem.vue';
import WidgetGrid from './widgetGrid.vue';
import draggable from 'vuedraggable';
// import draggable from '~/node_modules/vuedraggable/src/vuedraggable'; //由于vuedraggable的bug导致只能这样导入
export default {
  components: { draggable, WidgetFormItem, WidgetGrid },
  setup() {
    const store = useStore();
    const widgetData = store.state.widgetData;
    const widgetDataList = computed({
      get: () => widgetData.list,
      set: val => {
        store.commit('setWidgetList', val);
      }
    });
    // 添加组件事件
    const handleWidgetAdd = (evt: any) => {
      const newIndex = evt.newIndex;
      if (!newIndex && newIndex !== 0) return;
      const widgetItem = extendsProps(widgetData.list[newIndex]);
      widgetData.list[newIndex] = widgetItem;
      store.commit('setSelectWidget', widgetData.list[newIndex]);
    };
    // 附加属性
    const extendsProps = (item: any) => {
      //为拖拽到容器的元素添加唯一 key
      const key = new Date().valueOf() + '_' + Math.ceil(Math.random() * 99999);
      const cloneItem = _.cloneDeep(item);
      // 给新添加进来的组件，添加新的属性，但是为了不影响原数据，所以深拷贝
      cloneItem.key = key;
      cloneItem.options.remoteFunc = 'func_' + key;
      cloneItem.model = cloneItem.type + '_' + key;
      cloneItem.rules = [];
      return cloneItem;
    };
    return {
      widgetDataConfig: widgetData.config,
      widgetDataList,
      handleWidgetAdd
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color: #409eff;
$primary-background-color: #ecf5ff;
.widget-form-container {
  height: 100%;
  position: relative;
  border: 1px dashed #999;
  .widget-form {
    background: #fff;
    height: 100%;
  }
  .form-empty {
    position: absolute;
    text-align: center;
    width: 300px;
    font-size: 20px;
    top: 200px;
    left: 50%;
    margin-left: -150px;
    color: #ccc;
  }
}
</style>
<style lang="scss"></style>
