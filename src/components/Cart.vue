<script setup>
import { ref, onMounted } from "vue";


const data = ref("");
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);


const handleMouseDown = (event) => {
  isDragging.value = true;
  startX.value = event.pageX - event.currentTarget.offsetLeft;
  scrollLeft.value = event.currentTarget.scrollLeft;
};

const handleMouseMove = (event) => {
  if (!isDragging.value) return;
  event.preventDefault();
  const x = event.pageX - event.currentTarget.offsetLeft;
  const walk = x - startX.value;
  event.currentTarget.scrollLeft = scrollLeft.value - walk;
};

const handleMouseUp = () => {
  isDragging.value = false;
};
</script>

<template>
<div>
        <div class="cart-header">Koszyk</div>
        <div class="cart-item" v-for="item in 5" :key="item">
          <div class="product-info">
            <img src="https://via.placeholder.com/50" alt="Product" />
            <div class="product-name">Nazwa Produktu</div>
          </div>
          <div class="product-actions">
            <span>Cena</span>
            <input type="number" value="1" />
            <button>🗑️</button>
          </div>
        </div>
        <div class="cart-footer">
          <div class="total">Do zapłaty: 00zł</div>
          <button class="checkout-button">Zamów produkty ></button>
        </div>

        <div
          class="horizontal-scroll"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        >
          <h3>Może jeszcze to Ci się przyda</h3>
          <div class="suggested-items">
            <div class="suggested-item" v-for="n in 10" :key="n">
              <div class="image-placeholder"></div>
              <p class="item-name">Nazwa</p>
              <p class="item-price">Cena</p>
              <button class="add-button">+</button>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped lang="scss">
$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;





      .cart-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        background-color: $light-gray;
        border-radius: 8px;
        margin-bottom: 10px;

        .product-info {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
          }

          .product-name {
            font-weight: bold;
            color: $black;
          }
        }

        .product-actions {
          display: flex;
          align-items: center;
          gap: 10px;

          input {
            width: 40px;
            text-align: center;
            border: 1px solid $gray;
            border-radius: 4px;
          }

          button {
            background-color: transparent;
            border: none;
            cursor: pointer;
          }
        }
      }

      .cart-footer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .total {
          font-weight: bold;
          color: $black;
        }

        .checkout-button {
          background-color: $green;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background-color: darken($green, 10%);
          }
        }
      }
      .horizontal-scroll {
       margin: 0 auto;
        margin-top: 20px;
        background-color: $light-gray;
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
        max-width: 1200px;
        box-sizing: border-box;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none; 
        &::-webkit-scrollbar {
        display: none;
    }
        &:active {
          cursor: grabbing;
        }

        h3 {
          margin-bottom: 20px;
          font-size: 18px;
          color: $black;
        }

        .suggested-items {
          display: flex;
          gap: 30px;

          .suggested-item {
            flex: 0 0 auto;
            width: 200px;
            text-align: center;
            background-color: white;
            border-radius: 8px;
            box-shadow: $shadow;
            padding: 20px;

            .image-placeholder {
              width: 100%;
              height: 150px;
              background-color: $gray;
              border-radius: 8px;
              margin-bottom: 10px;
            }

            .item-name {
              font-size: 16px;
              font-weight: bold;
              color: $black;
              margin-bottom: 5px;
            }

            .item-price {
              font-size: 14px;
              color: $gray;
              margin-bottom: 10px;
            }

            .add-button {
              background-color: $green;
              color: white;
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              font-size: 20px;
              cursor: pointer;

              &:hover {
                background-color: darken($green, 10%);
              }
            }
          }
        }
      }

@media screen and (max-width: 1250px) {
 

    

   
      .horizontal-scroll {
        padding: 10px;
        h3 {
          font-size: 16px;
        }

        .suggested-items {
          gap: 10px;

          .suggested-item {
            width: 120px;
            padding: 10px;
            .image-placeholder {
              height: 100px;
            }

            .item-name {
              font-size: 14px;
            }

            .item-price {
              font-size: 12px;
            }

            .add-button {
              width: 30px;
              height: 30px;
              font-size: 18px;
            }
          }
        }
      }
    }

</style>
