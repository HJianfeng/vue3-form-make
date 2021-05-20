import { createStore } from 'vuex';

interface Widget {
  list: any[];
  config: any;
}
interface State {
  widgetData: Widget;
  selectWidget: any;
}
const widgetData: Widget = {
  list: [],
  config: {
    labelWidth: 100,
    labelPosition: 'right',
    size: 'small'
  }
};
const stateData: State = {
  selectWidget: null,
  widgetData: widgetData
};
const store = createStore({
  state: stateData,
  mutations: {
    setSelectWidget(state, data) {
      state.selectWidget = data;
    },
    setWidgetList(state, list) {
      state.widgetData.list = list;
    },
    setWidgetConfig(state, config) {
      state.widgetData.config = config;
    },
    deleteWidgetList(state, index) {
      state.widgetData.list.splice(index, 1);
    },
    cloneWidgetList(state, data) {
      state.widgetData.list.push(data);
    }
  },
  actions: {
    deleteWidgetList({ commit, state }, index) {
      const deleteKey = state.widgetData.list[index].key;
      commit('deleteWidgetList', index);
      if (state.widgetData.list.length === 0) {
        commit('setSelectWidget', null);
      } else if (state.selectWidget && state.selectWidget.key === deleteKey) {
        commit('setSelectWidget', state.widgetData.list[0]);
      }
    }
  },
  getters: {
    widgetDataGetter(state) {
      return state.widgetData;
    }
  }
});

export default store;
