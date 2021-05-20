import { girdTemplate, genetateFormItem } from './getCode';

export const generateCode = function (dataStr: string) {
  const data = JSON.parse(dataStr);
  let formItemTemplate = '';
  data.list.forEach((item: any) => {
    if (item.type === 'grid') {
      formItemTemplate += girdTemplate(item);
    } else if (item.type === 'blank') {
      formItemTemplate += `
        <el-form-item label="${item.name}" prop="${item.model}" key="${item.key}">
          <slot name="${item.model}" :model="models"></slot>
        </el-form-item>
      `;
    } else {
      formItemTemplate += genetateFormItem(item);
    }
  });

  const tempContainer = `
  <div class="fb-diy-form">
    <el-form ref="generateForm"
      label-suffix=":"
      :size="${data.config.size}"
      :model="models" :rules="rules" 
      :label-position="${data.config.labelPosition}" label-width="${data.config.labelWidth}px">
        ${formItemTemplate}
    </el-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
  `;

  const template = `
${tempContainer}
<script>
  export default {
    data () {
      return {
        models: {},
        rules: {}
      }
    },
    methods: {
      getData () {
        return new Promise((resolve, reject) => {
          this.$refs.generateForm.validate(valid => {
            if (valid) {
              resolve(this.models)
            } else {
              reject(new Error('表单数据校验失败').message)
            }
          })
        })
      },
      handleSubmit () {
        this.getData().then(data => {
          // data check success
          // data - form data
        }).catch(e => {
          // data check failed
        })
      }
    }
  }
</script>`;
  return template;
};
