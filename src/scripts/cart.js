import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(product, ilosc = 1) {
      const found = this.items.find(item => item.idDrug === product.idDrug);
      if (found) {
        if (found.quantity < found.amount) {
          found.quantity++;
          return 'positive';
        }
        return 'error';
      }
      this.items.push({ ...product, quantity: ilosc });
      return 'positive';
    },
    removeFromCart(productId) {
      const idx = this.items.findIndex(item => item.idDrug === productId);
      if (idx !== -1) this.items.splice(idx, 1);
    },
    updateQuantity(productId, quantity) {
      const found = this.items.find(item => item.idDrug === productId);
      if (found) {
        if (quantity < 1) found.quantity = 1;
        else if (quantity > found.amount) found.quantity = found.amount;
        else found.quantity = quantity;
      }
    }
  }
});