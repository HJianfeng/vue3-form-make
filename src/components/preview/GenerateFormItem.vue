<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widget.type == 'input'">
      <el-input
        v-if="
          widget.options.dataType == 'number' ||
          widget.options.dataType == 'integer' ||
          widget.options.dataType == 'float'
        "
        v-model.number="dataModel"
        type="number"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :disabled="widget.options.disabled"
      />
      <el-input
        v-else
        v-model="dataModel"
        :type="widget.options.dataType"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
      />
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        v-model="dataModel"
        type="textarea"
        :rows="5"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
      />
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :step="widget.options.step"
        controls-position="right"
        :disabled="widget.options.disabled"
        :min="widget.options.min"
        :max="widget.options.max"
      />
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :disabled="widget.options.disabled"
      >
        <el-radio
          v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="index"
          :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :disabled="widget.options.disabled"
      >
        <el-checkbox
          v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="index"
          :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrow-control="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{ width: widget.options.width }"
      />
    </template>

    <template v-if="widget.type == 'date'">
      <el-date-picker
        v-model="dataModel"
        :type="`${widget.options.type}${widget.options.isRange ? 'range' : ''}`"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        value-format="timestamp"
        :format="widget.options.format"
        :style="{ width: widget.options.width }"
      />
    </template>

    <template v-if="widget.type == 'rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      />
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
      />
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :filterable="widget.options.filterable"
      >
        <el-option
          v-for="item in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="item.value"
          :value="item.value"
          :label="widget.options.showLabel || widget.options.remote ? item.label : item.value"
        />
      </el-select>
    </template>

    <template v-if="widget.type == 'switch'">
      <el-switch v-model="dataModel" :disabled="widget.options.disabled" />
    </template>

    <template v-if="widget.type == 'slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{ width: widget.options.width }"
      />
    </template>
    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :options="widget.options.remoteOptions"
      />
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script>
import { toRefs, computed } from 'vue';
export default {
  props: {
    widget: { type: Object },
    models: { type: Object }
  },
  setup(props) {
    const { widget, models } = toRefs(props);
    const dataModel = computed({
      get() {
        return models.value[widget.value.model];
      },
      set(value) {
        models.value[widget.value.model] = value;
      }
    });
    return {
      dataModel
    };
  }
};
</script>
