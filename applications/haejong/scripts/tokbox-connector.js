/*
 * Tokbox JavaScript Developer Guide: https://tokbox.com/developer/guides/connect-session/js/
 */

// Tokbox credentials
var reskiNico_tokbox_apikey    = "45258952";
var reskiNico_tokbox_sessionID = "2_MX40NTI1ODk1Mn5-MTQzNDAyOTA4MTQ0Nn5Fb0ErcEVCOXdKcGJXbUtaL1lTdWhOUEx-fg";
var reskiNico_tokbox_sessionToken = "T1==cGFydG5lcl9pZD00NTI1ODk1MiZzaWc9YWNjMzc3M2YzYTAxNzc0YjA2MWNkNDQ4ZTQwOTViMWMyNzAzODVjYjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5USTFPRGsxTW41LU1UUXpOREF5T1RBNE1UUTBObjVGYjBFcmNFVkNPWGRLY0dKWGJVdGFMMWxUZFdoT1VFeC1mZyZjcmVhdGVfdGltZT0xNDM0MTE2MjY5Jm5vbmNlPTAuNzU2MzM0MjgzNDg0MTE0JmV4cGlyZV90aW1lPTE0MzQ3MjA5OTMmY29ubmVjdGlvbl9kYXRhPQ==";
// Tokbox session
var session = null;

function tokboxEstablishConnection()
{

/*
    console.log("TOKBOX EstablishConnection");


    Tundra.asset.loadScript("https://static.opentok.com/webrtc/v2.2/js/opentok.min.js").done(function() {
              
    });
*/
/*
    $.getScript( "http://static.opentok.com/v2/js/opentok.min.js", function( data, textStatus, jqxhr ) {
      console.log( data ); // Data returned
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "TOKBOX Load was performed." );

        // check for session requirements
        if (OT.checkSystemRequirements() == 1) {

        // initialize session
        session = OT.initSession(reskiNico_tokbox_apikey, reskiNico_tokbox_sessionID);
         session.connect(reskiNico_tokbox_sessionToken, function(error) {
            if (error) {
              console.log("Error connecting: ", error.code, error.message);
            } else {
              console.log("Connected to the session.");
            }
          });
        }
        else {
          // The client does not support WebRTC.
          // You can display your own message.
          console.log("TOKBOX - CLIENT DOES NOT SUPPORT WebRTC");
        }

    });
*/

/*
    // check for session requirements
    if (OT.checkSystemRequirements() == 1) {

    // initialize session
    session = OT.initSession(reskiNico_tokbox_apikey, reskiNico_tokbox_sessionID);
     session.connect(reskiNico_tokbox_sessionToken, function(error) {
        if (error) {
          console.log("Error connecting: ", error.code, error.message);
        } else {
          console.log("Connected to the session.");
        }
      });
    }
    else {
      // The client does not support WebRTC.
      // You can display your own message.
      console.log("TOKBOX - CLIENT DOES NOT SUPPORT WebRTC");
    }
*/
}

function tokboxDisconnectConnection()
{
    console.log("TOKBOX DisconnectConnection");

    if(session != null)
    {
        session.disconnect();
    }
}
