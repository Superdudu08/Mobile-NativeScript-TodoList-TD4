import Vue from 'nativescript-vue'

import Account from "./components/Account";

Vue.config.silent = false;

Vue.registerElement('RadioGroup', () => require('@webileapps/nativescript-radiobutton').RadioGroup)
Vue.registerElement('RadioButton', () => require('@webileapps/nativescript-radiobutton').RadioButton)

new Vue({
  render: function(h){    
    return h('Frame', [h(Account)]);
  }
}).$start()