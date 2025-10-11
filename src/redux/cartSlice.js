import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    user_id: null,
    session_id: null,
    color: null,
    size: null,
    status: null,
    created_at: null,
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      const {
        id,
        user_id,
        session_id,
        color,
        size,
        status,
        created_at,
        items,
      } = action.payload;

      state.id = id || null;
      state.user_id = user_id || null;
      state.session_id = session_id || null;
      state.color = color || null;
      state.size = size || null;
      state.status = status || null;
      state.created_at = created_at || null;

      // state.items = items || [];

      //     // ✅ backend cart items ko direct overwrite karna sahi hai
      // state.items = items?.map((it) => ({
      //   ...it,
      //   quantity: it.quantity || 1,
      // })) || [];

      items.forEach((newItem) => {
        // ✅ match cart item by unique id (product_id OR cart_item_id)
        const existing = state.items.find((i) => i.id === newItem.id);

        if (existing) {
          // sirf usi product ki quantity update karo
          existing.quantity = newItem.quantity || existing.quantity;
        } else {
          // otherwise naya product push karo
          state.items.push({
            ...newItem,
            quantity: newItem.quantity || 1,
            un_stitch: newItem.un_stitch || 0,
          });
        }
      });
    },
    clearCart: (state) => {
      state.id = null;
      state.user_id = null;
      state.session_id = null;
      state.color = null;
      state.size = null;
      state.status = null;
      state.created_at = null;
      state.items = [];
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // ✅ Update quantity (ab sahi jagah par hai)
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change); // kam se kam 1
      }
    },
  },
});

export const { setCart, clearCart, removeItem, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
