
function AddToCart() {    
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/cart', true);
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("product added");
        }
        else
        {
            console.log("false");
        }
    }

    // var ID = document.getElementById('product_id').innerHTML;
    
    var p = document.getElementById('product_id');
    var text = p.textContent;
    var number = Number(text);
    
    console.log(number);

    xhr.send("");
    // xhr.send(new Int8Array()); 
    // xhr.send(document);
}