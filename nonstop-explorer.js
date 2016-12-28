(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.jsonreference = function( json, reference ) {
      return json[reference];
    };   //  jsonreference
    
    var cpuStatus = {};
    
    ext.getCpuStatus = function( callback ) {
      $.ajax({
          url: "http://lightwave-server.nuwavetech.io/explore/v1/cpu",
          success: function( json ) {
            console.log( "cpustatus=" + JSON.stringify( json ) );
            cpuStatus = json;
            callback( cpuStatus.cpuList.cpuCount );
          }   //  success
      });
    };   //  getCpuStatus

    ext.getCpuBusy = function( processor ) {
      if ( cpuStatus.cpuList && cpuStatus.cpuList.cpu.length > processor )
        return cpuStatus.cpuList.cpu[processor].busy;
      else
        return 'error';
    };   //  getCpuStatus

    // Block and block menu descriptions
    var descriptor = {
      blocks: [
        // Block type, block name, function name
        [ 'R', 'Get CPU Count', 'getCpuStatus' ],
        [ 'r', 'Get busy% for CPU %n', 'getCpuBusy', 0 ]
      ],
      url: 'https://mark-roy.github.io/lightwave-scratch'
    };

    // Register the extension
    ScratchExtensions.register('NonStop Explorer', descriptor, ext);
})({});
