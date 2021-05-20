<template>
  <el-form-item
    v-if="element && element.key"
    class="widget-view"
    :class="{ active: selectWidget.key == element.key, is_req: element.options.required }"
    :label="element.name"
    @click.stop="handleSelectWidget(element)"
  >
    <template v-if="element.type == 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      />
    </template>
    <template v-if="element.type == 'textarea'">
      <el-input
        v-model="element.options.defaultValue"
        type="textarea"
        :rows="5"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
      />
    </template>

    <template v-if="element.type == 'number'">
      <el-input-number
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group v-model="element.options.defaultValue" :disabled="element.options.disabled">
        <el-radio
          v-for="item in element.options.options"
          :key="item.value"
          :style="{ display: element.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          v-for="item in element.options.options"
          :key="item.value"
          :style="{ display: element.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type == 'time'">
      <el-time-picker
        v-if="element.options.isRange"
        v-model="element.options.defaultValue"
        :is-range="true"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrow-control="element.options.arrowControl"
        :style="{ width: element.options.width }"
      />
      <el-time-picker
        v-else
        v-model="element.options.defaultValue"
        :is-range="false"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrow-control="element.options.arrowControl"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="`${element.options.type}${element.options.isRange ? 'range' : ''}`"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'rate'">
      <el-rate
        v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
      />
    </template>

    <template v-if="element.type == 'color'">
      <el-color-picker
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      />
    </template>

    <template v-if="element.type == 'select'">
      <el-select
        v-if="element.options.multiple"
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="true"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
      >
        <el-option
          v-for="item in element.options.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-select
        v-else
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="false"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
      >
        <el-option
          v-for="item in element.options.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </template>

    <template v-if="element.type == 'switch'">
      <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled" />
    </template>

    <template v-if="element.type == 'slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
        :options="element.options.remoteOptions"
      />
    </template>

    <template v-if="element.type == 'blank'">
      <div
        style="height: 50px; color: #999; background: #eee; line-height: 50px; text-align: center"
      >
        自定义区域（插槽）
      </div>
    </template>

    <template v-if="element.type == 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <div v-if="selectWidget.key == element.key" class="widget-view-action">
      <i class="el-icon-copy-document" @click.stop="handleWidgetClone(element)" />
      <i class="el-icon-delete" @click.stop="handleWidgetDelete(index)" />
    </div>

    <div v-if="selectWidget.key == element.key" class="widget-view-drag">
      <i class="el-icon-rank drag-widget" />
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, toRefs } from 'vue';

import _ from 'lodash';
export default {
  props: {
    element: { type: Object },
    index: { type: Number },
    elementParent: { type: Object, default: null }
  },
  setup(props) {
    const { elementParent } = toRefs(props);
    const store = useStore();
    const selectWidget = computed(() => {
      return store.state.selectWidget;
    });
    // 选择组件
    const handleSelectWidget = (item: any) => {
      store.commit('setSelectWidget', item);
    };
    const handleWidgetDelete = (index: number) => {
      if (elementParent.value) {
        elementParent.value.list.splice(index, 1);
      } else {
        store.dispatch('deleteWidgetList', index);
      }
    };
    const handleWidgetClone = (element: object) => {
      const item: any = _.cloneDeep(element);
      const key = new Date().valueOf() + '_' + Math.ceil(Math.random() * 99999);
      item.key = key;

      if (elementParent.value) {
        elementParent.value.list.push(item);
      } else {
        store.commit('cloneWidgetList', item);
      }
      handleSelectWidget(item);
    };
    return {
      selectWidget,
      handleSelectWidget,
      handleWidgetDelete,
      handleWidgetClone
    };
  }
};
</script>

<style lang="scss"></style>
