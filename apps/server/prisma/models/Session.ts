import { createModel } from 'schemix';
import cuidmixin from '../mixins/cuid';

export default createModel((Session) => {
  Session
    .mixin(cuidmixin)
    .string("user_id")
    .string("access_token", { raw: "@database.Text" })
    .int("expired_at")
    .map({ name: "session" });
});