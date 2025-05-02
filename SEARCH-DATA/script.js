const shoppingItems = [
    "Milk", "Bread", "Eggs", "Cheese", "Butter", "Yogurt", "Chicken", "Beef", "Fish", "Rice",
    "Pasta", "Salt", "Sugar", "Tea", "Coffee", "Juice", "Water", "Oil", "Flour", "Baking Powder",
    "Toothpaste", "Toothbrush", "Shampoo", "Soap", "Handwash", "Lotion", "Conditioner", "Face Wash", "Deodorant", "Tissue",
    "Toilet Paper", "Paper Towels", "Laundry Detergent", "Dish Soap", "Sponges", "Trash Bags", "Aluminum Foil", "Plastic Wrap", "Ziplock Bags", "Napkins",
    "Apples", "Bananas", "Oranges", "Grapes", "Mangoes", "Lemons", "Tomatoes", "Potatoes", "Onions", "Garlic",
    "Carrots", "Cucumbers", "Broccoli", "Cauliflower", "Spinach", "Lettuce", "Peas", "Corn", "Mushrooms", "Bell Peppers",
    "Ketchup", "Mayonnaise", "Mustard", "Soy Sauce", "Vinegar", "Honey", "Jam", "Peanut Butter", "Cereal", "Oats",
    "Noodles", "Canned Beans", "Canned Tuna", "Chips", "Cookies", "Chocolate", "Ice Cream", "Frozen Peas", "Frozen Pizza", "Frozen Chicken Nuggets",
    "Detergent", "Mop", "Broom", "Bucket", "Air Freshener", "Light Bulbs", "Batteries", "Extension Cord", "Screwdriver", "Nail Cutter",
    "Clothes Hangers", "Socks", "T-Shirts", "Notebook", "Pen", "Pencil", "Eraser", "Glue", "Scissors", "Sticky Notes"
];
const userSearch = document.getElementById("userSearch");
const searchResult = document.getElementById("searchResult");
const contentArea=document.getElementById("contentArea");
const search = () => {
    const searchValue = userSearch.value.trim();
    const toUpperCase = searchValue[0].toUpperCase();
    userSearch.value="";
    contentArea.innerHTML=`
    <h1 style="color:blue;"><u>Search Result</u></h1>`;
    searchResult.innerHTML="";
    if(shoppingItems.includes(searchValue)){
        searchResult.innerHTML=`
                <a style="color: green;font-size: 24px; text-decoration: none; font-weight: bold; padding:10px" href="google.com">${searchValue}</a>
                <br>
            `
    }else{
        const filterItem=shoppingItems.filter(data =>data[0] == toUpperCase);
    if (filterItem.length!=0) {
        filterItem.forEach(data=>
            searchResult.innerHTML+=`
                <a style="color: green;font-size: 24px; text-decoration: none; font-weight: bold; padding:10px" href="google.com">${data}</a>
                <br>
            `)
    }
    else{
        searchResult.innerHTML+=`
                <p style="color: green;font-size: 24px; text-decoration: none; font-weight: bold; padding:10px" href="google.com">Not Found</p>
                <br>
            `
    }
    }
    
}
