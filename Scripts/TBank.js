
var TBank = (function () {

    //Private
    var webImages = {};

    return {

        //Public
        numImages: 0,

        webSources: {
            attackdroid: 'Assets/Level1/20080530_attack droid_thumbnail.jpg',
            attackdroid2: 'Assets/Level1/20080530_attack_droid_thumbnail.jpg',
            attackdroid3: 'Assets/Level1/20080530_Bubba thumbnail.jpg',
            attackdroid4: 'Assets/Level1/20080530_Jackal_thumbnail.jpg'
        },


        loadTextures: function () {

            for (var src in this.webSources) {

                webImages[this.numImages] = new Image();

                webImages[this.numImages].src = this.webSources[src];

                this.numImages++;

            }

        },

        getImageWidth: function (imageNumber) {

            return webImages[imageNumber].width;
        },

        getImageHeight: function (imageNumber) {

            return webImages[imageNumber].height;
        }

    };
}());