import { createStore } from "easy-peasy";
import itemsModel from "./items-model";

const model = {
    items: itemsModel
}

export default createStore(model)
