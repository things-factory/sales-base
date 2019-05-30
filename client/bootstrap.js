import { store } from '@things-factory/shell'
import salesBase from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    salesBase
  })
}
