import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = "https://api.github.com/users"

/*FONT AWESOME */
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faSearch,faMapMarkerAlt,faLink,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faTwitter} from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faSearch,faMapMarkerAlt,faLink,faTwitter,faEnvelope)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
/*FONT AWESOME */


new Vue({
  el: '#app',
  render: h => h(App)
})
