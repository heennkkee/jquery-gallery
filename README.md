# jquery-gallery

jQuery-gallery is a small jQuery plugin that allows you to create a gallery from pictures in an incredibly easy way.

Assemble your wanted pictures in a div


    <div id="my-pictures">
      <img href="imgs/random/cute_cat.jpg">
      <img href="imgs/informatic/eifel_tower.png">
      <img href="imgs/news/hockey_champs.jpg">
    </div>

and then create the gallery by calling

    <script>
        $('#my-pictures').gallery();
    </script>

Voila!

You can pass some options to your gallery as an object in the function call, the following are supported:
* 'items': number of thumbnails to attempt to display
* 'thumbnailSize': the size of the thumbnails
* 'margins': the margins around one thumbnail (5 here results in 10px between thumbnails)
* 'height': the complete height of the gallery
* 'width': width of the gallery
* 'color': filling color of the gallery
* 'fill': color of the arrows to look around in the gallery with.

Enjoy!
