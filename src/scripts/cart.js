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
          found.quantity += 1;
        }
      } else {
        this.items.push({ ...product, quantity: ilosc });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.idDrug !== productId)
    },
    updateQuantity(productId, quantity) {
      const found = this.items.find(item => item.idDrug === productId)
      if (found) {
        found.quantity = Math.max(1, Math.min(quantity, found.amount))
      }
    }
  }
})