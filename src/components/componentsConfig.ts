interface ComponentType {
  type: string;
  name: string;
  options: object;
  columns?: object;
  props?: object[];
}

export const basicComponents: ComponentType[] = [
  {
    type: 'input',
    name: '单行文本',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: ''
    }
  },
  {
    type: 'number',
    name: '计数器',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    type: 'radio',
    name: '单选框组',
    options: {
      inline: 0,
      defaultValue: '',
      options: [
        { value: 'Option 1', label: 'Option 1' },
        { value: 'Option 2', label: 'Option 2' },
        { value: 'Option 3', label: 'Option 3' }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    options: {
      inline: 0,
      defaultValue: [],
      options: [
        { value: 'Option 1', label: 'Option 1' },
        { value: 'Option 2', label: 'Option 2' },
        { value: 'Option 3', label: 'Option 3' }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '请选择',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: ''
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '请选择',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'YYYY-MM-DD',
      timestamp: true,
      required: false,
      width: ''
    }
  },
  {
    type: 'rate',
    name: '评分',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    name: '颜色选择器',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    name: '下拉选择框',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        { value: 'Option 1', label: 'Option 1' },
        { value: 'Option 2', label: 'Option 2' },
        { value: 'Option 3', label: 'Option 3' }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    name: '开关',
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    }
  },
  {
    type: 'slider',
    name: '滑块',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    type: 'text',
    name: '文字',
    options: {
      defaultValue: 'This is a text',
      customClass: ''
    }
  }
];

export const advanceComponents: ComponentType[] = [
  {
    type: 'blank',
    name: '自定义区域',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'cascader',
    name: '级联选择器',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  }
];

export const layoutComponents: ComponentType[] = [
  {
    type: 'grid',
    name: '栅格布局',
    columns: [
      { span: 12, list: [] },
      { span: 12, list: [] }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
];

export const propsConfig = {
  common: {
    head: [
      { label: '字段标识', key: 'model', type: 'input' },
      { label: '标题', key: 'name', type: 'input' }
    ]
  },
  // 单行文本
  input: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    { label: '占位内容', parentkey: 'options', key: 'placeholder', type: 'input' },
    { label: '默认值', parentkey: 'options', key: 'defaultValue', type: 'input' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 多行文本
  textarea: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    { label: '占位内容', parentkey: 'options', key: 'placeholder', type: 'input' },
    {
      label: '默认值',
      parentkey: 'options',
      key: 'defaultValue',
      bind: { type: 'textarea' },
      type: 'input'
    },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 计数器
  number: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    {
      label: '最小值',
      key: 'min',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    {
      label: '最大值',
      key: 'max',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    {
      label: '步长',
      key: 'step',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 单选框组
  radio: [
    {
      label: '布局方式',
      type: 'radio',
      key: 'inline',
      options: [
        { key: 0, name: '块级' },
        { key: 1, name: '行内' }
      ]
    },
    { type: 'options', key: 'options', label: '数据选项' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 多选框组
  checkbox: [
    {
      label: '布局方式',
      type: 'radio',
      key: 'inline',
      options: [
        { key: 0, name: '块级' },
        { key: 1, name: '行内' }
      ]
    },
    { type: 'options', key: 'options', label: '数据选项' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 时间选择器
  time: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    {
      label: '占位内容',
      parentkey: 'options',
      link: '!isRange',
      key: 'placeholder',
      type: 'input'
    },
    {
      label: '开始时间占位内容',
      parentkey: 'options',
      link: 'isRange',
      key: 'startPlaceholder',
      type: 'input'
    },
    {
      label: '结束时间占位内容',
      parentkey: 'options',
      link: 'isRange',
      key: 'endPlaceholder',
      type: 'input'
    },
    { label: '是否为范围选择', key: 'isRange', type: 'switch' },
    { label: '格式', parentkey: 'options', key: 'format', type: 'input' },
    {
      label: '操作属性',
      type: 'attr',
      options: [
        { keyName: '完全只读', key: 'readonly' },
        { keyName: '禁用', key: 'disabled' },
        { keyName: '文本框可输入', key: 'editable' },
        { keyName: '显示清除按钮', key: 'clearable' },
        { keyName: '使用箭头进行时间选择', key: 'arrowControl' }
      ]
    }
  ],
  // 日期选择器
  date: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    {
      label: '占位内容',
      parentkey: 'options',
      link: '!isRange',
      key: 'placeholder',
      type: 'input'
    },
    {
      label: '开始时间占位内容',
      parentkey: 'options',
      link: 'isRange',
      key: 'startPlaceholder',
      type: 'input'
    },
    {
      label: '结束时间占位内容',
      parentkey: 'options',
      link: 'isRange',
      key: 'endPlaceholder',
      type: 'input'
    },
    { label: '是否为范围选择', key: 'isRange', type: 'switch' },
    { label: '格式', parentkey: 'options', key: 'format', type: 'input' },
    {
      label: '操作属性',
      type: 'attr',
      options: [
        { keyName: '完全只读', key: 'readonly' },
        { keyName: '禁用', key: 'disabled' },
        { keyName: '文本框可输入', key: 'editable' },
        { keyName: '显示清除按钮', key: 'clearable' }
      ]
    }
  ],
  // 评分
  rate: [
    {
      label: '最大值',
      key: 'max',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    { label: '允许半选', key: 'allowHalf', type: 'switch' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 颜色选择器
  color: [
    { label: '支持透明度', key: 'showAlpha', type: 'switch' },
    { label: '默认值', key: 'defaultValue', type: 'color' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 下拉选择框
  select: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    { label: '占位内容', parentkey: 'options', key: 'placeholder', type: 'input' },
    { label: '是否多选', key: 'multiple', type: 'switch' },
    { label: '是否可搜索', key: 'filterable', type: 'switch' },
    { type: 'options', key: 'options', label: '数据选项' },
    {
      label: '操作属性',
      type: 'attr',
      options: [
        { keyName: '禁用', key: 'disabled' },
        { keyName: '显示清除按钮', key: 'clearable' }
      ]
    }
  ],
  // 开关
  switch: [
    { label: '默认值', key: 'defaultValue', type: 'switch' },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 滑块
  slider: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    { label: '显示输入框', key: 'showInput', type: 'switch' },
    {
      label: '最小值',
      key: 'min',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    {
      label: '最大值',
      key: 'max',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    {
      label: '步长',
      key: 'step',
      type: 'input-number',
      bind: { min: 0, max: 100, step: 1 }
    },
    { label: '操作属性', type: 'attr', options: [{ keyName: '禁用', key: 'disabled' }] }
  ],
  // 文字
  text: [{ label: '文字值', parentkey: 'options', key: 'defaultValue', type: 'input' }],
  /** 高级字段 */
  // 自定义区域
  blank: [
    {
      label: '绑定数据类型',
      type: 'select',
      key: 'defaultType',
      options: [
        { label: '字符串', value: 'String' },
        { label: '对象', value: 'Object' },
        { label: '数组', value: 'Array' }
      ]
    }
  ],
  // 级联选择器
  cascader: [
    { label: '宽度', parentkey: 'options', key: 'width', type: 'input' },
    { label: '占位内容', parentkey: 'options', key: 'placeholder', type: 'input' },
    {
      label: '操作属性',
      type: 'attr',
      options: [
        { keyName: '禁用', key: 'disabled' },
        { keyName: '显示清除按钮', key: 'clearable' }
      ]
    }
  ],
  // 栅格
  grid: [
    {
      label: '栅格间隔',
      parentkey: 'options',
      key: 'gutter',
      type: 'input',
      bind: {
        type: 'number'
      }
    },
    {
      label: '水平排列方式',
      type: 'select',
      key: 'justify',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '右对齐', value: 'end' },
        { label: '居中', value: 'center' },
        { label: '两侧间隔相等', value: 'space-around' },
        { label: '两端对齐', value: 'space-between' }
      ]
    },
    {
      label: '垂直排列方式',
      type: 'select',
      key: 'align',
      options: [
        { label: '顶部对齐', value: 'top' },
        { label: '居中', value: 'middle' },
        { label: '底部对齐', value: 'bottom' }
      ]
    },
    { type: 'grid', label: '列配置项' }
  ]
};
