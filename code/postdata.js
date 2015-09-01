var pictureSource;   // picture source
var destinationType; // sets the format of returned value
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
	alert("ready");
}
 
function clearCache() {
    navigator.camera.cleanup();
}
 
var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        alert('Done!');
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
 
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://store.ojpeters.com/savedata"), win, fail, options);
}
 
function capturePhoto() {
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 100,
        destinationType: destinationType.FILE_URI
    });
}
 
function onFail(message) {
    alert('Failed because: ' + message);
}

 
function postData() {

	var formData = $("#ContactForm").serialize();
	var target="http://store.ojpeters.com/savedata/addcomment";
	//var target="http://localhost/remotemobile/index.php/savecomment"		
	alert("calling post");
	$.ajax({
			type: "POST",
			url: target,
			cache: false,
			data: formData,
			beforeSend: function() {
					// This callback function will trigger before data is sent
					$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			},
			complete: function() {
					// This callback function will trigger on data sent/received complete
					$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			},
			success: function (result) {

				$('#resultbox').html(result);
				$.mobile.changePage("#dialogbox");
				$('#resultshow').html("result");
			},
			error: function (request,error) {
				console.log("Error " + error);
			}        

			});
} 

 // A button will call this function
    //
    function capturePhoto2() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }
  // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
	  //$('#resultbox').html('Failed because: ' + message);
	  showAlert(message) ;
    }

// Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
	    // A button will call this function
    //
    function getPhoto(source) {
		// Retrieve image file location from specified source
		navigator.camera.getPicture(
		onPhotoURISuccess, 
		onFail, 
		{ quality: 50, 
			destinationType: destinationType.FILE_URI,
			sourceType: source 
		});
    }

	function showAlert(message) {
        navigator.notification.alert(
            message,  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        ); 
    }
function alertDismissed(){
//do nothing
}