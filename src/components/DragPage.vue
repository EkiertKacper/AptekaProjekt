<script>
</script>

<template>

    
    <!-- <div class="nav__container">
        <div class="nav__logo">
            <img src="../assets/logo.png" alt="logo" />
        </div>
        <div class="nav__menu">
            <ul>
                <li><a href="#">O nas</a></li>
                <li><a href="#">Produkty</a></li>
                <li><a href="#">Kontakt</a></li>
            </ul>
        </div>
        <div class="copy">
            <p>Wszelkie prawa zastrzeżone &copy; 2023</p>
        </div>
    </div> -->
    


    <header>
        <div class="lol"></div>
    </header>

    <main>
        <div class="image-section">
            <img src="../assets/lek.jpeg" alt="logo" width="250px" height="150px"/>
        </div>
        <div class="drag-info">
            <p>NAZWA</p>
            <p>CENA</p>
        </div>
        <div class="button-section">
            <select name="amount" id="amount">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button class="add-button">Dodaj do koszyka</button>
        </div>
        <div class="info-section">
            <p>Wybierz ilość produktu, a następnie kliknij przycisk "Dodaj do koszyka", aby dodać produkt do swojego koszyka zakupowego.</p>
        </div>
    </main>

    <footer>
        <div class="lol"></div>
    </footer>

</template>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .lol{
        width: 100%;
        height: 10vh;
        background-color: darkmagenta;
    }

    main{
        height: 80vh;
        padding: 15px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        // align-items: center;

        .image-section{
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            width: 100%;
        }

        .drag-info{
            
            p{
                margin: 10px 0px;
                font-size: 1.2rem;
            }
        }

        .button-section{
            display: flex;
            justify-content: start;
            align-items: center;
            margin-bottom: 10px;

            select{
                width: 25%;
                padding: 5px;
                margin-right: 15px;
                font-size: 1rem;
                border-radius: 5px;
                border: 1px solid #ccc;
            }

            .add-button{
                background-color: darkmagenta;
                width: 75%;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                border: none;
                cursor: pointer;

                &:hover{
                    background-color: #a500ff;
                }
            }
        }
    }

</style>