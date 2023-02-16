import { createModel } from 'schemix';
import cuidmixin from '../mixins/cuid';
import { datetimeParanoid } from '../mixins/datetime'
export default createModel((User) => {
  User
    .mixin(cuidmixin)
    .string("email")
    .string("password")
    .mixin(datetimeParanoid)
    .map({ name: "user" });
});