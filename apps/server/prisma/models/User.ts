import { createModel } from 'schemix';
import cuidmixin from '../mixins/cuid';

export default createModel((User) => {
  User
    .mixin(cuidmixin)
    .string("name")
    .string("email", { unique: true })
    .string("password")
    .map({ name: "users" });
});