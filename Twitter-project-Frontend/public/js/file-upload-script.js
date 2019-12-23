(function() {
    const profileImageUpload = document.querySelector( '#profile-image-upload' );

    profileImageUpload.addEventListener( 'change', function() {
       // console.log( 2 );
        if( this.files && this.files[0] ) {
            const reader = new FileReader();

            reader.onload = function( event ) {
                document.querySelector( '#profile-image' ).setAttribute( 'src', event.target.result );
                document.querySelector( '#add-photo-message' ).style.display = 'none';
                document.querySelector( '#profile-image' ).style.display = 'inline-block';
            };

            reader.readAsDataURL( this.files[0] );
        }
    });
}());