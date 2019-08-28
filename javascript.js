var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCompInp = document.getElementById("productComp");
var productDesInp = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var searchInp = document.getElementById("searchInp")
var searchRow = document.getElementById("searchRow")
var currentIndex = 0;
var productContainer;


if(localStorage.getItem("productContainer") == null)
    {
        productContainer = [];
    }
else
    {
        productContainer = JSON.parse(localStorage.getItem("productContainer"));
        displayData();
    }

searchInp.onkeyup = function()
{
    searchProducts(searchInp.value);
}
addBtn.onclick = function()
{
    if(addBtn.innerHTML == "Add Product")
        {
            addProduct();
            displayData();
            clearForm();
        }
    else
        {
            updateProduct();
            displayData();
            clearForm();
        }
    
}

function addProduct()
{
    var product = 
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            company: productCompInp.value,
            desc : productDesInp.value
        }
    productContainer.push(product);
    localStorage.setItem("productContainer" , JSON.stringify(productContainer))
}

function displayData()
{
    var cols = "";
    for(var i = 0 ; i<productContainer.length ; i++)
        {
            cols += '<div class="col-md-3"> <div class="product"><h3>'+ productContainer[i].name +'</h3>     <p>'+productContainer[i].price +'</p> <p class="text-danger">'+productContainer[i].company +'</p><p class="text-info">'+productContainer[i].desc +'</p><button onclick="deleteProduct('+i+')" class="btn btn-danger">Delete</button> <button onclick="setForm('+i+')" class="btn btn-info mr-3">Update</button> </div></div>'
        }
    document.getElementById("rowData").innerHTML = cols;
}

function clearForm()
{
    var inputs = document.getElementsByClassName("form-control");
    for(var i = 0 ; i<inputs.length ; i++ )
        {
            inputs[i].value = ""
        }
}

function deleteProduct(id)
{
    productContainer.splice(id , 1);
    localStorage.setItem("productContainer" , JSON.stringify(productContainer))
    displayData();
}

function setForm(i)
{
    productNameInp.value = productContainer[i].name;
    productPriceInp.value = productContainer[i].price;
    productCompInp.value = productContainer[i].company;
    productDesInp.value = productContainer[i].desc;
    
    addBtn.innerHTML = "Update Product";
    currentIndex = i;
}

function searchProducts(term)
{
    var searchCols = "";
    for(var i = 0 ; i<productContainer.length ; i++)
        {
            if(productContainer[i].name.includes(term))
                {
                    searchCols += '<div class="col-md-3"> <div class="product"><h3>'+ productContainer[i].name +'</h3>     <p>'+productContainer[i].price +'</p> <p class="text-danger">'+productContainer[i].company +'</p><p class="text-info">'+productContainer[i].desc +'</p><button onclick="deleteProduct('+i+')" class="btn btn-danger">Delete</button> <button class="btn btn-info">Update</button> </div></div>'
                }
            searchRow.innerHTML = searchCols;
        }
}

function updateProduct()
{
    productContainer[currentIndex].name = productNameInp.value;
    productContainer[currentIndex].price = productPriceInp.value;
    productContainer[currentIndex].company = productCompInp.value;
    productContainer[currentIndex].des = productDesInp.value;
    
    addBtn.innerHTML = "Add Product";
    localStorage.setItem("productContainer" , JSON.stringify(productContainer))

}








































