
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;
            var element = $(hash)
            if (element === null || element === undefined) {
                return
            }

            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
                // scrollTop: element.offset().top
            }, 300, function(){
                $(hash).addClass("padding-top")
                $('.navbar-collapse').removeClass("show")
                $('.navbar-toggler').style = 'transform: rotateX(180deg); transition: 500ms'
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

const getCategories = () => {
   return fetch('http://localhost:5000/api/category')
       .then(res => res.json())
       .then(categories => {
           this.categories = categories
           for (let i = 0; i < categories.length; i++) {

           }
       })
}


