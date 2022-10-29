import { action, thunk, computed } from "easy-peasy";
import apiClient from '../api/apiClient';

const itemsModel = {
    items: [],
    setItems: action((state, payload) => {
        state.items = payload;
    }),

    apiError: null,
    setApiError: action((state, payload) => {
        state.apiError = payload;
    }),

    isLoading: true,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),

    itemCount: computed((state) => state.items.length),

    getItems: thunk(async (actions) => {
        actions.setIsLoading(true)
        try {
            const response = await apiClient.get('/items');
            actions.setItems(response.data)
            actions.setApiError(null)
        } catch (err) {
            actions.setApiError(`Error: ${err.message}`)
            console.error(err)
        }
        finally {
            actions.setIsLoading(false)
        }
    }),

    addItem: thunk(async (actions, itemText, helpers) => {
        const { items } = helpers.getState();

        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const newItem = { id, checked: false, item: itemText };

        actions.setIsLoading(true)
        try {
            const response = await apiClient.post('/items', newItem);
            const listItems = [...items, response.data];
            actions.setItems(listItems)
            actions.setApiError(null)
        } catch (err) {
            actions.setApiError(`Error: ${err.message}`)
            console.error(err)
        }
        finally {
            actions.setIsLoading(false)
        }
    }),

    editItem: thunk(async (actions, updatedItem, helpers) => {
        const { items } = helpers.getState();

        const listItems = items.map((item) => {
            return item.id === updatedItem.id
                ? { ...updatedItem }
                : item
        });

        actions.setIsLoading(true)
        try {
            console.log(updatedItem)
            const _ = await apiClient.patch(`/items/${updatedItem.id}`, updatedItem);
            actions.setItems(listItems)
            actions.setApiError(null)
        } catch (err) {
            actions.setApiError(`Error: ${err.message}`)
            console.error(err)
        }
        finally {
            actions.setIsLoading(false)
        }
    }),

    deleteItem: thunk(async (actions, id, helpers) => {
        const { items } = helpers.getState();

        const listItems = items.filter((item) => {
            return item.id !== id
        });

        actions.setIsLoading(true)
        try {
            const _ = await apiClient.delete(`/items/${id}`);
            actions.setItems(listItems)
            actions.setApiError(null)
        } catch (err) {
            actions.setApiError(`Error: ${err.message}`)
            console.error(err)
        }
        finally {
            actions.setIsLoading(false)
        }
    })
}

export default itemsModel
