(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getCpuStatus = function( callback ) {

      $.ajax({
          url: "http://lightwave-server.nuwavetech.io/explore/v1/cpu",
          success: function( data ) {
            var json = JSON.parse( data );
            console.log( "cpustatus=" + data );
            callback( json );
          }   //  success
      });
      
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['R', 'Get CPU Status', 'getCpuStatus']
        ],
        url: 'http://www.nuwavetech.com/lightwave'
    };

    // Register the extension
    ScratchExtensions.register('NonStop Explorer', descriptor, ext);
})({});
