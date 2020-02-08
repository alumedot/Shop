import { ActionTypes } from './types/ActionTypes';


export const deleteProduct = (id: string) => {
    return { type: ActionTypes.DeleteProduct, id };
};
