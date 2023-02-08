import { createModel } from 'schemix';
import cuidmixin from '../mixins/cuid';

export default createModel((Session) => {
  Session
    .mixin(cuidmixin)
    .string("user_id")
    .string("access_token")
    .string("refresh_token")
    .string("expired_at")
    .map({ name: "session" });
});