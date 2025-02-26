import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('state', state, 'action', action)
      if (state.indexOf(action.productId) !== -1) {
       console.log('indexof != -1', state)
        return state
      }
      return [ ...state, action.productId ]
    case REMOVE_FROM_CART:
      console.log('state', ...state, 'action', action);
     // return state;
      return state.filter(item => item !== action.productId);
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
      case REMOVE_FROM_CART:
        return { ...state,
          [action.productId]: (state[action.productId] || 0) - 1

        }
     default:
       return state
    //const { productId } = action
    // if (productId) {
    //   return {
    //     ...state,
    //     [productId]: state[productId]
    //   }
    // }
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
