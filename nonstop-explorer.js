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
    
    ext.getCpuStatus = function( server, callback ) {
      $.ajax({
          url: 'http://' + server + '/explore/v1/cpu',
          success: function( json ) {
            console.log( "cpustatus=" + JSON.stringify( json ) );
            cpuStatus = json;
            callback();
          }   //  success
      });
    };   //  getCpuStatus

    ext.getCpuCount = function( callback ) {
      callback( cpuStatus.cpuList.cpuCount );
    };   //  getCpuCount

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
        [ 'w', 'Get CPU Status from %s', 'getCpuStatus', 'lightwave-server.nuwavetech.io' ],
        [ 'R', 'Get CPU Count', 'getCpuCount' ],
        [ 'r', 'Get busy% for CPU %n', 'getCpuBusy', 0 ]
      ],
      url: 'https://mark-roy.github.io/lightwave-scratch'
    };

    // Register the extension
    ScratchExtensions.register('NonStop Explorer', descriptor, ext);
})({});
