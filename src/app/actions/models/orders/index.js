export const ORDER_CLICKED = 'ORDER_CLICKED';
export const ORDER_PANEL_SYNC_BUTTON_CLICKED = 'ORDER_PANEL_SYNC_BUTTON_CLICKED';
export const CREATE_ORDER = 'CREATE_ORDER';
export const ORDER_CREATION_DISCOUNT_SUBMITTED = 'ORDER_CREATION_DISCOUNT_SUBMITTED';

export function orderClicked(order) {
    return {
        type: ORDER_CLICKED,
        payload: order,
    };
}

export function ordersPanelSyncButtonClicked() {
    return {
        type: ORDER_PANEL_SYNC_BUTTON_CLICKED,
    };
}

export function createOrder(data) {
    return {
        type: CREATE_ORDER,
        payload: data,
    };
}

export function orderCreationDiscountSubmitted(value) {
    return {
        type: ORDER_CREATION_DISCOUNT_SUBMITTED,
        payload: value
    };
}

export {
    fetchOrderBegin,
    fetchOrderError,
    fetchOrderSuccess,

    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_BEGIN,
} from './fetchActions';