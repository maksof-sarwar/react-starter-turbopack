import { createMixin } from "schemix";

export default createMixin((cuidMixin) => {
  cuidMixin
    .string("id", { id: true, default: { cuid: true } });
});